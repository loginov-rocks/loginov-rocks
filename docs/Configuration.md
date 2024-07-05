# Configuration

## GitHub Actions

1. `AWS_ACCESS_KEY_ID`
2. `AWS_ACCOUNT`
3. `AWS_REGION`
4. `AWS_SECRET_ACCESS_KEY`
5. `CONTENTFUL_WEBHOOK_FUNCTION_NAME`
6. `DATA_BUCKET_NAME`
7. `DATA_GITHUB_FILE_KEY`
8. `DEPLOYMENT_BUCKET_NAME`
9. `SECRET_ARN`
10. `UPDATE_GITHUB_FUNCTION_NAME`
11. `WEB_APP_CMS_DOLPH_PAGE_COMPONENT_TYPE`
12. `WEB_APP_CMS_EDUCATION_PAGE_COMPONENT_TYPE`
13. `WEB_APP_CMS_HOME_PAGE_COMPONENT_TYPE`
14. `WEB_APP_FUNCTION_NAME`
15. `WEB_APP_REPOSITORY`

## GitHub Personal Access Token

No additional scopes, just public access.

## Infrastructure

### Queue

* `ReceiveMessageWaitTimeSeconds` = 20 seconds (maximum)
* `VisibilityTimeout` = 6 * `WebAppFunction.Timeout` + `WebAppFunctionEventSourceMapping.MaximumBatchingWindowInSeconds`
* Move to DLQ after 5 attempts, store for 2 weeks.
