import { S3Object } from '@loginov-rocks/loginov-rocks-shared';

export class HomeRoute {
  constructor({
    cmsClient, cmsHomePageComponentType, dataS3BucketName, dataS3GitHubFileKey, s3,
  }) {
    this.cmsClient = cmsClient;
    this.cmsHomePageComponentType = cmsHomePageComponentType;
    this.dataS3BucketName = dataS3BucketName;
    this.dataS3GitHubFileKey = dataS3GitHubFileKey;
    this.s3 = s3;
  }

  async getData() {
    if (process.env.NODE_ENV !== 'production') {
      /* eslint-disable global-require */
      const cmsHomePageComponentMock = require('../cms/__fixtures__/cmsHomePageComponent.json');
      const gitHubDataMock = require('@loginov-rocks/loginov-rocks-shared/src/GitHub/__fixtures__/gitHubData.json');
      /* eslint-enable */

      return Promise.resolve({
        cmsHomePageComponent: cmsHomePageComponentMock,
        gitHubData: gitHubDataMock,
      });
    }

    const cmsHomePageComponent = await this.cmsClient.getCmsComponentByType(this.cmsHomePageComponentType);

    const gitHubS3Object = new S3Object({
      bucketName: this.dataS3BucketName,
      fileKey: this.dataS3GitHubFileKey,
      s3: this.s3,
    });
    const gitHubS3ObjectData = await gitHubS3Object.read();
    const gitHubData = JSON.parse(gitHubS3ObjectData);

    return { cmsHomePageComponent, gitHubData };
  }
}
