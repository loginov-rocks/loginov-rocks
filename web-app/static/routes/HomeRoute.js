import { GetObjectCommand } from '@aws-sdk/client-s3';

export class HomeRoute {
  constructor({
    cmsClient, cmsHomePageComponentType, dataS3BucketName, dataS3GitHubFileKey, s3Client,
  }) {
    this.cmsClient = cmsClient;
    this.cmsHomePageComponentType = cmsHomePageComponentType;
    this.dataS3BucketName = dataS3BucketName;
    this.dataS3GitHubFileKey = dataS3GitHubFileKey;
    this.s3Client = s3Client;
  }

  async getData() {
    // Use mocks in non-production environment.
    if (process.env.NODE_ENV !== 'production') {
      /* eslint-disable global-require */
      const cmsHomePageComponentMock = require('../cms/__fixtures__/cmsHomePageComponent.json');
      const gitHubDataMock = require('../../../shared/src/GitHub/__fixtures__/gitHubData.json');
      /* eslint-enable */

      return Promise.resolve({
        cmsHomePageComponent: cmsHomePageComponentMock,
        gitHubData: gitHubDataMock,
      });
    }

    const cmsHomePageComponent = await this.cmsClient.getCmsComponentByType(this.cmsHomePageComponentType);
    const gitHubData = await this.getGitHubData();

    return { cmsHomePageComponent, gitHubData };
  }

  async getGitHubData() {
    const getObjectCommand = new GetObjectCommand({
      Bucket: this.dataS3BucketName,
      Key: this.dataS3GitHubFileKey,
    });

    let s3Object;

    try {
      s3Object = await this.s3Client.send(getObjectCommand);
    } catch (error) {
      if (error.name !== 'NoSuchKey') {
        throw error;
      }
    }

    if (!s3Object || !s3Object.Body) {
      throw new Error('GitHub data S3 object not found or empty.');
    }

    const data = await s3Object.Body.transformToString();

    return JSON.parse(data);
  }
}
