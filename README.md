# loginov.rocks

[![Contentful Webhook CI](https://github.com/loginov-rocks/loginov-rocks/actions/workflows/contentful-webhook-ci.yml/badge.svg)](https://github.com/loginov-rocks/loginov-rocks/actions/workflows/contentful-webhook-ci.yml)
[![Infrastructure CI](https://github.com/loginov-rocks/loginov-rocks/actions/workflows/infrastructure-ci.yml/badge.svg)](https://github.com/loginov-rocks/loginov-rocks/actions/workflows/infrastructure-ci.yml)
[![Shared CI](https://github.com/loginov-rocks/loginov-rocks/actions/workflows/shared-ci.yml/badge.svg)](https://github.com/loginov-rocks/loginov-rocks/actions/workflows/shared-ci.yml)
[![Update GitHub CI](https://github.com/loginov-rocks/loginov-rocks/actions/workflows/update-github-ci.yml/badge.svg)](https://github.com/loginov-rocks/loginov-rocks/actions/workflows/update-github-ci.yml)
[![Web App CI](https://github.com/loginov-rocks/loginov-rocks/actions/workflows/web-app-ci.yml/badge.svg)](https://github.com/loginov-rocks/loginov-rocks/actions/workflows/web-app-ci.yml)

[![CD](https://github.com/loginov-rocks/loginov-rocks/actions/workflows/cd.yml/badge.svg)](https://github.com/loginov-rocks/loginov-rocks/actions/workflows/cd.yml)

This open-source project introduces a monorepo tailored for the development, management, and deployment of
[my website](https://loginov.rocks), serving as a showcase for various web development concepts, it is an embodiment of
efficiency, automation, and scalability.

## Architecture

### Overview

At its core, the **Monorepo** architecture consolidates the code of different services, the website itself, and
configurations within a single repository, simplifying versioning and dependency management. Embracing **Serverless**
architecture, powered by AWS Lambda functions, ensures a cost-effective approach to handling tasks triggered by events
like content updates or scheduled GitHub data retrieval.

**Cloud-native** principles drive the utilization of AWS services such as SQS and S3, optimizing scalability and
integration. The project also adheres to **Infrastructure as Code** (IaC) practices, defining the entire infrastructure
for reproducibility and simplified change management. **Static Site Generation** enhances website performance, and
pre-rendering content to boost user experience and search engine visibility.

The project's **Event-driven** approach adeptly responds to changes in content or the codebase.
**Continuous Integration** and **Continuous Deployment** (CI/CD) pipelines, incorporating **Quality Gates** like build,
test, and deployment processes, automate workflows seamlessly. Security remains paramount through the implementation of
the **Principle of Least Privilege**, effectively minimizing potential risks.

Notably, the project also incorporates a **Headless CMS** approach for flexible content management and
**Containerization** for efficient deployment and scalability. Website implements **Single Page Application** (SPA)
architecture supporting **Hybrid Rendering** to strike a balance between server-side generation and client-side
rendering for optimal performance.

This simplified yet comprehensive project benefits from efficient content management, automated workflows, and a
scalable, cost-effective infrastructure. It stands as a practical template, showcasing best practices in modern web
development, and provides an inclusive solution for developers seeking to elevate their projects.

### Infrastructure View

![Infrastructure View](https://raw.githubusercontent.com/loginov-rocks/loginov-rocks/main/docs/Infrastructure-View.png)

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
3. **GitHub CD Action** builds artifacts and uploads them to AWS Infrastructure
4. **GitHub CD Action** deploys Lambdas from artifacts uploaded

## Docs

* [Configuration](https://github.com/loginov-rocks/loginov-rocks/blob/main/docs/Configuration.md)
* [Development](https://github.com/loginov-rocks/loginov-rocks/blob/main/docs/Development.md)

## Reference

* [Build React Static in Lambda](https://github.com/loginov-rocks/Build-React-Static-in-Lambda)
