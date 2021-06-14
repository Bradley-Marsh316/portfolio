const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  SES: new AWS.SES({ region: 'eu-west-1' })
});

const { DateTime } = require('luxon');

const { errorResponse, successResponse } = require('../../../libs/responses');
const {
  client_lookup,
  record_lookup,
  update_items,
  get_items
} = require('../../../libs/dynamoDB');

const { Hosting, format_hosting_record_for_read } = require('../../../models/Hosting');

const { format_update_params } = require('../../../libs/formating');

const TableName = process.env.DYNAMODB_TABLE_NAME;
const invoice_lambda = process.env.INVOICE_LAMBDA;
/**
 * Get all hosting records
 * Run locally by running the following command:
 * $ serverless invoke local -f get-all-records --aws-profile developyn --stage dev --env dev
 */
module.exports.get_all_records = async event => {
  try {
    const params = {
      TableName,
      IndexName: 'TypeIndex',
      KeyConditionExpression: '#type = :type',
      ExpressionAttributeNames: { '#type': 'Type' },
      ExpressionAttributeValues: {
        ':type': { S: `Hosting` }
      }
    };

    let hosting_records = await get_items({ params });

    hosting_records = hosting_records.map(hosting_record =>
      AWS.DynamoDB.Converter.unmarshall(hosting_record)
    );

    return successResponse(200, hosting_records);
  } catch (error) {
    console.error('Error reading all hosting records');
    console.error(error);
    return errorResponse(error.statusCode || 500, error);
  }
};

/**
 * Update status of hosting record
 * Run locally by inputting details into './events/update_status.json` and running the following command:
 * $ serverless invoke local -f update-status -p events/update_status.json --aws-profile developyn --stage dev --env dev
 */
module.exports.update_status = async event => {
  try {
    if (typeof event.body === 'string') event.body = JSON.parse(event.body);
    const { id, status } = event.body;

    let original_hosting_record = format_hosting_record_for_read(
      await record_lookup({ id, service: 'HOSTING' })
    );

    let updated_hosting_record = new Hosting({
      api_key: original_hosting_record.api_key,
      id,
      company: original_hosting_record.company,
      website: original_hosting_record.website,
      price: original_hosting_record.price,
      billing_frequency: original_hosting_record.billing_frequency,
      date_from: original_hosting_record.date_from,
      expiry_date: original_hosting_record.expiry_date,
      warning_period: original_hosting_record.warning_period,
      status,
      created_at: new Date(original_hosting_record.created_at)
    });

    const formatted_item = format_update_params(
      updated_hosting_record.toItem()
    );

    await update_items([formatted_item]);

    return successResponse(200, 'Updated status of hosting record');
  } catch (error) {
    console.info(error);
    return errorResponse(error, 'Could not update status of hosting record');
  }
};

/**
 * Contact clients and generate invoices
 * Run locally by running the following command:
 * $ serverless invoke local -f generate-invoice-contact-client --aws-profile developyn --stage dev --env dev
 */
module.exports.generate_invoice_contact_client = async event => {
  try {
    if (typeof event.body === 'string') event.body = JSON.parse(event.body);

    const params = {
      TableName,
      IndexName: 'TypeIndex',
      KeyConditionExpression: '#type = :type',
      ExpressionAttributeNames: { '#type': 'Type' },
      ExpressionAttributeValues: {
        ':type': { S: `Hosting` }
      }
    };

    let hosting_records = await get_items({ params });
    hosting_records = hosting_records.map(hosting_record =>
      format_hosting_record_for_read(hosting_record)
    );
    for (const hosting_record of hosting_records) {
      let { billing_frequency } = hosting_record;
      const [amount, unit] = Object.values(hosting_record.warning_period);
      const notification_date = DateTime.fromISO(hosting_record.expiry_date)
        .minus({ [unit]: amount })
        .toISODate();
      let expiry_date = DateTime.fromISO(
        hosting_record.expiry_date
      ).toISODate();
      const date_now = DateTime.now().toISODate();
      if (hosting_record.status !== 'Live') return;
      if (notification_date === date_now) {
        const client = await client_lookup(hosting_record.api_key);

        const first_name = client.FirstName.S;
        const { company, api_key } = hosting_record;
        const amount = {
          amount: (parseFloat(hosting_record.price.amount) / 1.2).toFixed(2),
          amount_with_vat: hosting_record.price.amount
        };
        const reason = `${
          hosting_record.billing_frequency.charAt(0).toUpperCase() +
          hosting_record.billing_frequency.slice(1)
        } billing for hosting`;

        const lambda_params = {
          FunctionName: invoice_lambda,
          InvocationType: 'RequestResponse',
          Payload: JSON.stringify({
            body: {
              first_name,
              company,
              amount,
              reason,
              api_key
            }
          })
        };

        const email_params = {
          from: '"Developyn LTD" <noreply@developyn.com>',
          to: client.Email.S,
          subject: 'Your hosting payment is due soon',
          text: `Dear ${
            client.FirstName.S
          },\n\nYour ${hosting_record.billing_frequency.toLowerCase()} payment for hosting is due soon. The cost is £${
            hosting_record.price.amount
          }. An invoice will be sent soon!\n\nMany thanks,\nDevelopyn`
        };

        await Promise.all([
          lambda.invoke(lambda_params).promise(),
          transporter.sendMail(email_params)
        ]);
      } else if (expiry_date === date_now) {
        let date_from = expiry_date;

        switch (billing_frequency) {
          case 'Annually':
            expiry_date = DateTime.fromISO(date_from).plus({ year: 1 }).toISO();
            break;
          case 'Monthly':
            expiry_date = DateTime.fromISO(date_from)
              .plus({ month: 1 })
              .toISO();
        }

        const new_hosting_record = new Hosting({
          api_key: hosting_record.api_key,
          id: hosting_record.id,
          company: hosting_record.company,
          website: hosting_record.website,
          price: hosting_record.price,
          billing_frequency,
          date_from,
          expiry_date,
          warning_period: hosting_record.warning_period,
          status: hosting_record.status,
          created_at: new Date(hosting_record.created_at)
        });

        const formatted_item = format_update_params(
          new_hosting_record.toItem()
        );

        await update_items([formatted_item]);
      }
    }

    return successResponse(200, 'Successfully generated invoice');
  } catch (error) {
    console.info(error);
    return errorResponse(error, 'Could not contact client or generate invoice');
  }
};
