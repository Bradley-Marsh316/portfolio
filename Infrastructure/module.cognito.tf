module "cognito" {
  source              = "./aws/cognito"
  GOOGLE_CLIENT_ID    = var.GOOGLE_CLIENT_ID
  GOOGLE_SECRET       = var.GOOGLE_SECRET
}