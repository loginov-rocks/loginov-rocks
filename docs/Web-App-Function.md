# Web App Function

## AWS

### User Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::${DATA_S3_BUCKET_NAME}",
        "arn:aws:s3:::${DATA_S3_BUCKET_NAME}/*"
      ]
    },
    {
      "Sid": "VisualEditor1",
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::${WEB_APP_S3_BUCKET_NAME}",
        "arn:aws:s3:::${WEB_APP_S3_BUCKET_NAME}/*"
      ]
    },
    {
      "Sid": "VisualEditor2",
      "Effect": "Allow",
      "Action": "cloudfront:CreateInvalidation",
      "Resource": "arn:aws:cloudfront::${ACCOUNT}:distribution/${WEB_APP_CLOUDFRONT_DISTRIBUTION_ID}"
    }
  ]
}
```

`ListBucket` permission is needed to get an error if the object is not found.

## Docker

### Build

```sh
docker build -t loginov-rocks-web-app-repository .
```

### Run

```sh
docker run --env-file .env -p 9000:8080 loginov-rocks-web-app-repository
```

### Test

```sh
curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'
```

### Enter container

```sh
docker ps
docker exec -it <CONTAINER ID> bash
```

## Without Docker

```sh
node lambda/without-docker
```

## Reference

* [Running Gatsby in an AWS Lambda](https://www.jameshill.dev/articles/running-gatsby-within-aws-lambda/)
* [Creating Lambda container images](https://docs.aws.amazon.com/lambda/latest/dg/images-create.html)
* [Creating Lambda functions defined as container images](https://docs.aws.amazon.com/lambda/latest/dg/configuration-images.html)
