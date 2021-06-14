resource "aws_cloudfront_distribution" "dashboard_distribution" {
  price_class = "PriceClass_100" // Limit Edge locations to US, Canada and EU https://aws.amazon.com/cloudfront/pricing/
  // origin is where CloudFront gets its content from.


  origin {
    // Here we're using our S3 bucket's URL!
    domain_name = aws_s3_bucket.www.website_endpoint
    // This can be any name to identify this origin.
    origin_id   = local.domain_name

    custom_origin_config {
      // These are all the defaults.
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only" // TODO: make https-only
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }


  enabled             = true
  default_root_object = "index.html"

  custom_error_response {
    error_caching_min_ttl = 300
    error_code = 404
    response_code = 200
    response_page_path = "/index.html"
  }

  // All values are defaults from the AWS console.
  default_cache_behavior {
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    // This needs to match the `origin_id` above.
    target_origin_id       = local.domain_name
    min_ttl                = 60
    default_ttl            = 86400
    max_ttl                = 31536000

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  // Here we're ensuring we can hit this distribution using www.runatlantis.io
  // rather than the domain name CloudFront gives us.
  aliases = [local.domain_name]

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  // Here's where our certificate is loaded in!
  viewer_certificate {
    acm_certificate_arn = var.DEVELOPYN_CERT_ARN
    ssl_support_method  = "sni-only"
    minimum_protocol_version = "TLSv1.2_2019"
  }
}