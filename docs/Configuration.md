# Configuration

## GitHub

### Repository Secrets

1. `AWS_ACCESS_KEY_ID`
2. `AWS_SECRET_ACCESS_KEY`
3. `AWS_REGION`
4. `DEPLOYMENT_S3_BUCKET_NAME`
5. `CONTENTFUL_WEBHOOK_LAMBDA_NAME`
6. `UPDATE_GITHUB_LAMBDA_NAME`
7. `WEB_APP_CMS_CLIENT_ACCESS_TOKEN`
8. `WEB_APP_CMS_CLIENT_SPACE`
9. `WEB_APP_CMS_DOLPH_PAGE_COMPONENT_TYPE`
10. `WEB_APP_CMS_HOME_PAGE_COMPONENT_TYPE`
11. `DATA_S3_BUCKET_NAME`
12. `DATA_S3_GITHUB_FILE_KEY`

## Permissions

### AWS User

AWS User is required for the Continuous Deployment done with GitHub Actions - `loginov-rocks-github-cd` user with the
`InlinePolicy`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:PutObject",
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::${DEPLOYMENT_S3_BUCKET_NAME}/contentful-webhook.zip",
        "arn:aws:s3:::${DEPLOYMENT_S3_BUCKET_NAME}/update-github.zip"
      ],
      "Effect": "Allow"
    },
    {
      "Action": "lambda:UpdateFunctionCode",
      "Resource": [
        "arn:aws:lambda:${AWS_REGION}:${AWS_ACCOUNT}:function:${CONTENTFUL_WEBHOOK_LAMBDA_NAME}",
        "arn:aws:lambda:${AWS_REGION}:${AWS_ACCOUNT}:function:${UPDATE_GITHUB_LAMBDA_NAME}"
      ],
      "Effect": "Allow"
    },
    {
      "Action": [
        "s3:ListBucket",
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::${DATA_S3_BUCKET_NAME}",
        "arn:aws:s3:::${DATA_S3_BUCKET_NAME}/${DATA_S3_GITHUB_FILE_KEY}"
      ],
      "Effect": "Allow"
    }
  ]
}
```

### GitHub Personal Access Token

No additional scopes, just public access.
