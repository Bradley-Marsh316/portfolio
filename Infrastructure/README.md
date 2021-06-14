# Infrastructure

Here is some terraform code which creates the Cognito user pool
for the users of our WordPress dashboard. We use a module approach
with each service in a dedicated folder (here we have a cognito folder 
for this module). We have a module for the dashboard. As the files for 
s3, cloudfront were quite small, instead of having folders for each, we
put them all together. So this folder houses everything for the frontend
site to run from.
