//Set up base user pool
resource "aws_cognito_user_pool" "wordpress_user_pool" {
  name                      = "wordpress-user-pool-${terraform.workspace}"
  username_attributes       = ["email"]
  auto_verified_attributes  = ["email"]

  password_policy {
    minimum_length    = 8
    require_lowercase = false
    require_numbers   = false
    require_symbols   = false
    require_uppercase = false
  }

  lambda_config {
    post_confirmation = "${aws_lambda_function.post_sign_up.arn}"
    custom_message = "${aws_lambda_function.custom_message.arn}"
  }

  schema {
    attribute_data_type = "Boolean"
    mutable = true
    name = "T_C"
  }

  schema {
    attribute_data_type = "String"
    mutable = true
    name = "ApiKey"

    string_attribute_constraints {
      min_length = 60
      max_length = 70
    }
  }

  schema {
    attribute_data_type = "String"
    mutable = true
    name = "CustomerId"

    string_attribute_constraints {
      min_length = 5
      max_length = 25
    }
  }

  schema {
    attribute_data_type = "String"
    mutable = true
    name = "name"
    required = true

    string_attribute_constraints {
      min_length = 2
      max_length = 100
    }
  }


  tags = {
    Name = "Wordpress Dashboard User Pool for ${terraform.workspace}"
    Project = "Wordpress Dashboard"
  }
}

//Define the domain name for the cognito login
resource "aws_cognito_user_pool_domain" "main" {
  domain       = "wordpress-dashboard-${terraform.workspace}"
  user_pool_id = aws_cognito_user_pool.wordpress_user_pool.id
}

//Define our login client (Google log in)
resource "aws_cognito_user_pool_client" "wordpress_user_pool_client" {
  name = "wordpress_user_pool_client"
  user_pool_id = aws_cognito_user_pool.wordpress_user_pool.id
  supported_identity_providers = ["Google"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows = ["implicit"]
  allowed_oauth_scopes = ["email", "openid", "profile"]
  prevent_user_existence_errors = "ENABLED"
  //Requires complete URI
  callback_urls = local.callback_urls
  logout_urls = local.logout_urls
  default_redirect_uri = "https://${local.www_domain_name}"
}

//Define identity provider for federated sign in
resource "aws_cognito_identity_provider" "wordpress_user_pool_provider" {
  user_pool_id  = aws_cognito_user_pool.wordpress_user_pool.id
  provider_name = "Google"
  provider_type = "Google"

  provider_details = {
    authorize_scopes = "email profile openid"
    client_id        = "${local.client_id}"
    client_secret    = "${local.client_secret}"
  }

  attribute_mapping = {
    email    = "email"
    username = "sub"
    name = "name"
    picture = "picture"
  }
}

resource "aws_cognito_user_group" "wordpress_user_pool_customer_group" {
  name         = "Customer"
  user_pool_id = aws_cognito_user_pool.wordpress_user_pool.id
  description  = "Customer user group"
  precedence   = 1
}
