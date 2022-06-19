import { S3Object } from '@loginov-rocks/loginov-rocks-shared';

export class HomeRoute {
  constructor({
    contentful, contentfulHomePageContentType, dataS3BucketName, dataS3GitHubFileKey, s3,
  }) {
    this.contentful = contentful;
    this.contentfulHomePageContentType = contentfulHomePageContentType;
    this.dataS3BucketName = dataS3BucketName;
    this.dataS3GitHubFileKey = dataS3GitHubFileKey;
    this.s3 = s3;
  }

  async getData() {
    if (process.env.NODE_ENV !== 'production') {
      /* eslint-disable global-require */
      const gitHubDataMock = require('@loginov-rocks/loginov-rocks-shared/src/GitHub/__fixtures__/gitHubData.json');
      const homePageEntriesMock = require('./__fixtures__/homePageEntries.json');
      /* eslint-enable */

      return Promise.resolve({
        gitHubData: gitHubDataMock,
        homePage: homePageEntriesMock.items[0],
      });
    }

    const gitHubS3Object = new S3Object({
      bucketName: this.dataS3BucketName,
      fileKey: this.dataS3GitHubFileKey,
      s3: this.s3,
    });
    const gitHubS3ObjectData = await gitHubS3Object.read();
    const gitHubData = JSON.parse(gitHubS3ObjectData);

    const homePageEntries = await this.contentful.getEntries({
      content_type: this.contentfulHomePageContentType,
      include: 10,
      limit: 1,
    });
    const homePage = homePageEntries.items[0];

    return { gitHubData, homePage };
  }
}
