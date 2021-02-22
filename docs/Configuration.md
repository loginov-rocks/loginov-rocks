# Configuration

## GitHub

### Repository Secrets

1. `AWS_ACCESS_KEY_ID`
2. `AWS_SECRET_ACCESS_KEY`
3. `AWS_REGION` - used the same for both Web App and Update GitHub Lambda
4. `WEB_APP_S3_BUCKET_NAME`
5. `WEB_APP_CLOUDFRONT_DISTRIBUTION_ID`
6. `UPDATE_GITHUB_LAMBDA_NAME`

## AWS

### Update GitHub Lambda Environment Variables

1. `GITHUB_PERSONAL_ACCESS_TOKEN`
2. `WEB_APP_S3_BUCKET_NAME`
3. `WEB_APP_S3_GITHUB_FILE_KEY`

## Web App S3 Bucket

Block all public access, configure Origin Access Identity for the CloudFront Distribution. 

## Web App Cloudfront Distribution

Simple setup using one origin (Web App S3 Bucket) with the help of Origin Access Identity.

## Update GitHub Lambda

Basic execution role, but also S3 PutObject for a specific resource matching `WEB_APP_S3_BUCKET_NAME` and
`WEB_APP_S3_GITHUB_FILE_KEY`, example:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::${WEB_APP_S3_BUCKET_NAME}/${WEB_APP_S3_GITHUB_FILE_KEY}"
        }
    ]
}
```

## AWS User

AWS User needed for the Continuous Deployment done with GitHub Actions.

S3: ListBucket, GetObject, PutObject, DeleteObject for a specific resource matching `WEB_APP_S3_BUCKET_NAME` and any
object in it, example:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:ListBucket",
                "s3:DeleteObject"
            ],
            "Resource": [
                "arn:aws:s3:::${WEB_APP_S3_BUCKET_NAME}/*",
                "arn:aws:s3:::${WEB_APP_S3_BUCKET_NAME}"
            ]
        }
    ]
}
```

CloudFront: ListInvalidations, GetInvalidation, CreateInvalidation for a specific resource matching
`WEB_APP_CLOUDFRONT_DISTRIBUTION_ID`, example:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "cloudfront:ListInvalidations",
                "cloudfront:GetInvalidation",
                "cloudfront:CreateInvalidation"
            ],
            "Resource": "arn:aws:cloudfront::${ACCOUNT}:distribution/${WEB_APP_CLOUDFRONT_DISTRIBUTION_ID}"
        }
    ]
}
```

## GitHub Personal Access Token

No additional scopes, just public access.
