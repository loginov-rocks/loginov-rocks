# Configuration

## Infrastructure

### Queue

* `ReceiveMessageWaitTimeSeconds` = 20 seconds (maximum)
* `VisibilityTimeout` = 6 * `WebAppFunction.Timeout` + `WebAppFunctionEventSourceMapping.MaximumBatchingWindowInSeconds`
* Move to DLQ after 5 attempts, store for 2 weeks.

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
10. `WEB_APP_CMS_DOLPH_PAGE_COMPONENT_TYPE`
11. `WEB_APP_CMS_EDUCATION_PAGE_COMPONENT_TYPE`
12. `WEB_APP_CMS_HOME_PAGE_COMPONENT_TYPE`
13. `DATA_S3_BUCKET_NAME`
14. `DATA_S3_GITHUB_FILE_KEY`
15. `SECRET_ARN`

## Permissions

### GitHub Personal Access Token

No additional scopes, just public access.

## Docker

### Build

```sh
docker build -t loginov-rocks-persistent-web-app-repository .
```

### Run

```sh
docker run --env-file .env -p 9000:8080 loginov-rocks-persistent-web-app-repository
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
