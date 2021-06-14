const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const ses = new AWS.SES({ region: 'eu-west-1' });

const { errorResponse, successResponse } = require('../../../libs/responses');
const { record_lookup, get_items } = require('../../../libs/dynamoDB');

const TableName = process.env.DYNAMODB_TABLE_NAME;
const STAGE = process.env.STAGE;

/**
 * Add recipieint to email list for a given notification email
 * The check for the empty string is due to the fact that you can initialise a StringSet as empty, so it initialises with an empty string
 * Run locally by input details into './events/add_recipient.json' and running the following command
 * serverless invoke local -f add-recipient -p events/add_recipient.json --aws-profile developyn-bot --stage dev --env dev
 */
module.exports.add_recipient = async event => {
  try {
    if (typeof event.body === 'string') event.body = JSON.parse(event.body);
    let { recipient_email, id } = event.body;
    const api_key = event.headers['x-api-key'];
    if (!api_key) return errorResponse(400, 'Must provide API Key');
    if (!id || !recipient_email)
      return errorResponse(400, "Must provide id and recipient's email");
    recipient_email = recipient_email.toLowerCase();

    const notification_email = await record_lookup({
      id,
      api_key,
      service: 'NOTIFICATION_EMAIL'
    });
    let recipient_emails = notification_email.RecipientEmails.SS;

    let params = {
      TableName,
      Item: notification_email
    };

    if (recipient_emails.includes(recipient_email))
      return errorResponse(400, 'Email already added');

    const contains_empty_string = recipient_emails[0] === '';

    if (contains_empty_string) {
      params.Item.RecipientEmails.SS = [recipient_email];
    } else {
      params.Item.RecipientEmails.SS.push(recipient_email);
    }

    await dynamodb.putItem(params).promise();
    return successResponse(
      200,
      "Successfully added recipient's email to the list"
    );
  } catch (error) {
    console.error('Error adding recipient to notification email');
    console.error(error);
    return errorResponse(error.statusCode || 500, error);
  }
};

/**
 * Send emails to users on the recipient list
 * Run locally by input details into './events/send_notification_emails.json' and running the following command
 * serverless invoke local -f send-notification-emails -p events/send_notification_emails.json --aws-profile developyn-bot --stage dev --env dev
 */
module.exports.send_notification_emails = async event => {
  try {
    if (typeof event.body === 'string') event.body = JSON.parse(event.body);
    const api_key = event.headers['x-api-key'];
    const { id } = event.body;
    if (!api_key) return errorResponse(400, 'Must provide API Key');
    if (!id) return errorResponse(400, 'Must provide id');

    const notification_email = await record_lookup({
      id,
      api_key,
      service: 'NOTIFICATION_EMAIL'
    });
    const recipient_emails = notification_email.RecipientEmails.SS;
    const fields = notification_email.Fields.M;
    const sender = notification_email.Sender.S;

    const {
      Template: { S: template }
    } = notification_email;

    const convertedFields = convert_fields_to_default_fields(fields);

    const params = {
      Source: sender,
      Template: template,
      Destinations: recipient_emails.map(email => {
        return {
          Destination: {
            ToAddresses: [email]
          }
        };
      }),
      DefaultTemplateData: `${convertedFields}`
    };

    await ses.sendBulkTemplatedEmail(params).promise();
    return successResponse(200, 'Successfully sent emails to recipients');
  } catch (error) {
    console.error('Error sending bulk templated email');
    console.error(error);

    return errorResponse(error.statusCode || 500, error);
  }
};

/**
 * List fields for a given template
 * Run locally by input details into './events/get_template_fields.json' and running the following command
 * serverless invoke local -f get-template-fields -p events/get_template_fields.json --aws-profile developyn --stage dev --env dev
 */
module.exports.get_template_fields = async event => {
  try {
    if (typeof event.body === 'string') event.body = JSON.parse(event.body);
    let { template_name } = event.queryStringParameters;
    if (!template_name)
      return errorResponse(500, 'Must provide name of template');

    template_name = template_name.replace(/ /g, '_');

    const params = {
      TemplateName: template_name
    };

    const { Template } = await ses.getTemplate(params).promise();

    let fields = [];
    if (Template.SubjectPart.includes('{{'))
      fields.push(Template.SubjectPart.replace('{{', '').replace('}}', ''));

    fields = [...fields, ...extract_fields(Template.HtmlPart)];
    return successResponse(200, fields);
  } catch (error) {
    return errorResponse(500, error);
  }
};

function extract_fields(html) {
  const fieldRegex = /{{\w+}}/g;
  let fields = html.match(fieldRegex);
  if (!fields) return [];
  fields = fields.map(field => field.replace('{{', '').replace('}}', ''));
  if (fields.length) return new Set(fields);
  else return [];
}

/**
 * List available templates
 * Run locally by running the following command
 * serverless invoke local -f get-templates --aws-profile developyn --stage dev
 */
module.exports.get_templates = async event => {
  try {
    const params = {
      TableName,
      IndexName: 'TypeIndex',
      KeyConditionExpression: '#type = :type',
      ExpressionAttributeNames: { '#type': 'Type' },
      ExpressionAttributeValues: {
        ':type': { S: `EmailTemplate` }
      }
    };

    let templates = await get_items({ params });
    const template_names = templates.map(template =>
      template.TemplateName.S.replace(/_/g, ' ')
    );
    return successResponse(200, template_names);
  } catch (error) {
    console.info(error);
    return errorResponse(error.statusCode || 500, error);
  }
};

function convert_fields_to_default_fields(fields) {
  let obj = {};

  for (const [field, value] of Object.keys(fields)) {
    obj[field] = value.S;
  }

  obj = JSON.stringify(obj);

  return obj;
}
