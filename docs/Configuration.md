# Configuration

## GitHub

### Repository Secrets

1. `AWS_ACCESS_KEY_ID`
2. `AWS_REGION` - used the same for both Web App and Update GitHub Lambda
3. `AWS_SECRET_ACCESS_KEY`
4. `UPDATE_GITHUB_LAMBDA_NAME`
5. `WEB_APP_CLOUDFRONT_DISTRIBUTION_ID`
6. `WEB_APP_S3_BUCKET_NAME`

## Permissions

### AWS User

AWS User is required for the Continuous Deployment done with GitHub Actions - `loginov-rocks-github-cd` user with the
`loginov-rocks-github-cd-inline-policy`:

* S3: ListBucket, GetObject, PutObject, DeleteObject for a specific resource matching `WEB_APP_S3_BUCKET_NAME` and any
  object in it
* CloudFront: ListInvalidations, GetInvalidation, CreateInvalidation for a specific resource matching
  `WEB_APP_CLOUDFRONT_DISTRIBUTION_ID`
* Lambda: CreateFunction, UpdateFunctionCode, UpdateFunctionConfiguration for a specific matching `AWS_REGION` and
  `UPDATE_GITHUB_LAMBDA_NAME`

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:ListBucket",
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::${DATA_S3_BUCKET_NAME}",
        "arn:aws:s3:::${DATA_S3_BUCKET_NAME}/*"
      ],
      "Effect": "Allow"
    },
    {
      "Action": [
        "lambda:CreateFunction",
        "lambda:UpdateFunctionCode",
        "lambda:UpdateFunctionConfiguration"
      ],
      "Resource": "arn:aws:lambda:${REGION}:${ACCOUNT}:function:${UPDATE_GITHUB_LAMBDA_NAME}",
      "Effect": "Allow"
    }
  ]
}
```

### GitHub Personal Access Token

No additional scopes, just public access.
