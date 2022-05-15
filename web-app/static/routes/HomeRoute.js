import { S3Object } from './S3Object';

export class HomeRoute {
  constructor({
    dataS3BucketName, dataS3GitHubFileKey, dataS3HomeFileKey, s3,
  }) {
    this.dataS3BucketName = dataS3BucketName;
    this.dataS3GitHubFileKey = dataS3GitHubFileKey;
    this.dataS3HomeFileKey = dataS3HomeFileKey;
    this.s3 = s3;
  }

  async getData() {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line global-require
      const gitHubMockData = require('@loginov-rocks/loginov-rocks-shared/src/GitHub/__fixtures__/gitHubData.json');
      // eslint-disable-next-line global-require
      const homeMockData = require('@loginov-rocks/loginov-rocks-shared/src/Home/__fixtures__/homeData.json');

      return Promise.resolve({
        gitHubData: gitHubMockData,
        homeData: homeMockData,
      });
    }

    const gitHubS3Object = new S3Object({
      bucketName: this.dataS3BucketName,
      fileKey: this.dataS3GitHubFileKey,
      s3: this.s3,
    });
    const homeS3Object = new S3Object({
      bucketName: this.dataS3BucketName,
      fileKey: this.dataS3HomeFileKey,
      s3: this.s3,
    });

    const [
      gitHubS3ObjectData,
      homeS3ObjectData,
    ] = await Promise.all([
      gitHubS3Object.read(),
      homeS3Object.read(),
    ]);

    const gitHubData = JSON.parse(gitHubS3ObjectData);
    const homeData = JSON.parse(homeS3ObjectData);

    return { gitHubData, homeData };
  }
}
