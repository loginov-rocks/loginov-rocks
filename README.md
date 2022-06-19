# loginov.rocks

[![Shared CI](https://github.com/loginov-rocks/loginov-rocks/actions/workflows/shared-ci.yml/badge.svg)](https://github.com/loginov-rocks/loginov-rocks/actions/workflows/shared-ci.yml)
[![Web App CI](https://github.com/loginov-rocks/loginov-rocks/actions/workflows/web-app-ci.yml/badge.svg)](https://github.com/loginov-rocks/loginov-rocks/actions/workflows/web-app-ci.yml)
[![Update GitHub CI](https://github.com/loginov-rocks/loginov-rocks/actions/workflows/update-github-ci.yml/badge.svg)](https://github.com/loginov-rocks/loginov-rocks/actions/workflows/update-github-ci.yml)
[![CD](https://github.com/loginov-rocks/loginov-rocks/actions/workflows/cd.yml/badge.svg)](https://github.com/loginov-rocks/loginov-rocks/actions/workflows/cd.yml)

Monorepo for my [personal website](https://loginov.rocks).

## Architecture

![AWS Architecture Diagram](https://raw.githubusercontent.com/loginov-rocks/loginov-rocks/main/docs/AWS-Architecture-Diagram.png)

### Workflows

#### A) Contentful Update

1. _Editor_ changes the content in **Contentful**
2. **Contentful** triggers **Contentful Webhook** Lambda
3. **Contentful Webhook** sends a message to SQS **Queue**
4. see [C) Static Site Generation](#c-static-site-generation)

#### B) GitHub Update

1. EventBridge **Update GitHub Rule** triggers **Update GitHub Function** Lambda by schedule (once a day)
2. **Update GitHub Function** gets data from **GitHub API**
3. **GitHub API** resolves personal access token to a particular user's **GitHub Profile** and returns user data
4. **Update GitHub Function** writes GitHub file (if not changed) to S3 **Data Bucket**
5. **Data Bucket** sends a Put Object notification in the form of a message to SQS **Queue**
6. see [C) Static Site Generation](#c-static-site-generation)

#### C) Static Site Generation

1. SQS **Queue** waits for a batch of messages for 5 minutes and triggers **Web App Function** Lambda
2. **Web App Function** gets GitHub file from S3 **Data Bucket**
3. **Web App Function** gets Contentful data from **Contentful Delivery API**
4. **Contentful Delivery** API gets data from **Contentful** and returns
5. **Web App Function** builds Web App static assets and deploys them to S3 **Web App Bucket**

#### D) Continuous Deployment

1. _Developer_ pushes tag to **GitHub Repository**
2. **GitHub Repository** triggers **GitHub CD Action**
3. **GitHub CD Action** builds artifacts and deploys them to AWS Infrastructure

## Docs

* [Configuration](https://github.com/loginov-rocks/loginov-rocks/blob/main/docs/Configuration.md)
* [Web App Function](https://github.com/loginov-rocks/loginov-rocks/blob/main/docs/Web-App-Function.md)

## Reference

* [Build React Static in Lambda](https://github.com/loginov-rocks/Build-React-Static-in-Lambda)
