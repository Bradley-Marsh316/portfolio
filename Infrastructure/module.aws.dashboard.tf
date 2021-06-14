#Admin Dashboard static front-end
module "dashboard" {
  source             = "./aws/dashboard/"
  GITHUB_USERNAME    = var.GITHUB_USERNAME
  GITHUB_TOKEN       = var.GITHUB_TOKEN
  DEVELOPYN_CERT_ARN = var.DEVELOPYN_CERT_ARN
  HOSTED_ZONE_ID =  var.HOSTED_ZONE_ID
}

# output "dashboard_cloudfront_domain_name" {
#   description = "The domain name of the Dashboard Public Cloudfront distribution"
#   value       = "${module.dashboard.dashboard_cloudfront_domain_name}"
# }
# output "dashboard_cloudfront_fqdn" {
#   description = "The Fully Qualified Domain Name (alternate domain name) of the Cloudfront distribution"
#   value       = "${module.dashboard.dashboard_cloudfront_fqdn}"
# }
# output "dashboard_distribution_bucket" {
#   description = "The name of the S3 bucket where Codepipeline stores the build"
#   value       = "${module.dashboard.dashboard_distribution_bucket}"
# }
# output "dashboard_public_bucket" {
#   description = "The name of the public S3 bucket from which Dashboard Public pages are served"
#   value       = "${module.dashboard.dashboard_public_bucket}"
# }