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
