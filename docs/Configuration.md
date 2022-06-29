# Configuration

## GitHub

### Repository Secrets

1. `AWS_ACCESS_KEY_ID`
2. `AWS_SECRET_ACCESS_KEY`
3. `AWS_ACCOUNT`
4. `AWS_REGION`
5. `DEPLOYMENT_S3_BUCKET_NAME`
6. `CONTENTFUL_WEBHOOK_LAMBDA_NAME`
7. `UPDATE_GITHUB_LAMBDA_NAME`
8. `WEB_APP_REPOSITORY`
9. `WEB_APP_LAMBDA_NAME`
10. `WEB_APP_CMS_CLIENT_ACCESS_TOKEN`
11. `WEB_APP_CMS_CLIENT_SPACE`
12. `WEB_APP_CMS_DOLPH_PAGE_COMPONENT_TYPE`
13. `WEB_APP_CMS_HOME_PAGE_COMPONENT_TYPE`
14. `DATA_S3_BUCKET_NAME`
15. `DATA_S3_GITHUB_FILE_KEY`

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
        "arn:aws:lambda:${AWS_REGION}:${AWS_ACCOUNT}:function:${UPDATE_GITHUB_LAMBDA_NAME}",
        "arn:aws:lambda:${AWS_REGION}:${AWS_ACCOUNT}:function:${WEB_APP_LAMBDA_NAME}"
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
    },
    {
      "Action": "ecr:GetAuthorizationToken",
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": [
        "ecr:CompleteLayerUpload",
        "ecr:UploadLayerPart",
        "ecr:InitiateLayerUpload",
        "ecr:BatchCheckLayerAvailability",
        "ecr:PutImage"
      ],
      "Resource": "arn:aws:ecr:${AWS_REGION}:${AWS_ACCOUNT}:repository/${WEB_APP_REPOSITORY}",
      "Effect": "Allow"
    }
  ]
}
```

### GitHub Personal Access Token

No additional scopes, just public access.
