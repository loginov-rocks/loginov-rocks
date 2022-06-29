# Configuration

## GitHub

### Repository Secrets

1. `AWS_ACCESS_KEY_ID`
2. `AWS_SECRET_ACCESS_KEY`
3. `AWS_REGION`
4. `DEPLOYMENT_S3_BUCKET_NAME`
5. `CONTENTFUL_WEBHOOK_LAMBDA_NAME`
6. `UPDATE_GITHUB_LAMBDA_NAME`

## Permissions

### AWS User

AWS User is required for the Continuous Deployment done with GitHub Actions - `loginov-rocks-github-cd` user with the
`loginov-rocks-github-cd-inline-policy`:

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
