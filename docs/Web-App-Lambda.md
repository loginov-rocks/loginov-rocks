# Web App Lambda

## AWS

### User Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::${WEB_APP_S3_BUCKET_NAME}/*"
    }
  ]
}
```

## Docker

### Build

```sh
docker build -t loginov-rocks-web-app .
```

### Run

```sh
docker run --env-file .env -p 9000:8080 loginov-rocks-web-app
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

## Reference

* [Running Gatsby in an AWS Lambda](https://www.jameshill.dev/articles/running-gatsby-within-aws-lambda/)
* [Creating Lambda container images](https://docs.aws.amazon.com/lambda/latest/dg/images-create.html)
