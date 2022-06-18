import { S3Object } from '@loginov-rocks/loginov-rocks-shared';

export class HomeRoute {
  constructor({
    contentful, contentfulHomePageContentType, dataS3BucketName, dataS3GitHubFileKey, dataS3HomeFileKey, s3,
  }) {
    this.contentful = contentful;
    this.contentfulHomePageContentType = contentfulHomePageContentType;
    this.dataS3BucketName = dataS3BucketName;
    this.dataS3GitHubFileKey = dataS3GitHubFileKey;
    this.dataS3HomeFileKey = dataS3HomeFileKey;
    this.s3 = s3;
  }

  async getData() {
    if (process.env.NODE_ENV !== 'production') {
      /* eslint-disable global-require */
      const gitHubDataMock = require('@loginov-rocks/loginov-rocks-shared/src/GitHub/__fixtures__/gitHubData.json');
      const homeDataMock = require('@loginov-rocks/loginov-rocks-shared/src/Home/__fixtures__/homeData.json');
      const homePageEntriesMock = require('./__fixtures__/homePageEntries.json');
      /* eslint-enable */

      return Promise.resolve({
        gitHubData: gitHubDataMock,
        homeData: homeDataMock,
        homePage: homePageEntriesMock.items[0],
      });
    }

    const homePageEntries = await this.contentful.getEntries({
      content_type: this.contentfulHomePageContentType,
      include: 10,
      limit: 1,
    });

    const homePage = homePageEntries.items[0];

    const [
      gitHubS3ObjectData,
      homeS3ObjectData,
    ] = await S3Object.batchRead(this.s3, [
      {
        bucketName: this.dataS3BucketName,
        fileKey: this.dataS3GitHubFileKey,
      },
      {
        bucketName: this.dataS3BucketName,
        fileKey: this.dataS3HomeFileKey,
      },
    ]);

    const gitHubData = JSON.parse(gitHubS3ObjectData);
    const homeData = JSON.parse(homeS3ObjectData);

    return { gitHubData, homeData, homePage };
  }
}
