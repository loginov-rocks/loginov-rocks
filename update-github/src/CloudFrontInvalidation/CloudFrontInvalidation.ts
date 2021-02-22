import AWS from 'aws-sdk';

interface Options {
  distributionId: string;
  path: string;
}

export class CloudFrontInvalidation {
  private readonly distributionId: string;

  private readonly path: string;

  private readonly cloudFront: AWS.CloudFront;

  constructor({ distributionId, path }: Options) {
    this.distributionId = distributionId;
    this.path = path;
    this.cloudFront = new AWS.CloudFront();
  }

  async invalidate(): Promise<void> {
    // Create timestamp in the following format: "2021-02-22T12:40:57".
    const callerReference = new Date().toISOString().slice(0, 19);

    await this.cloudFront.createInvalidation({
      DistributionId: this.distributionId,
      InvalidationBatch: {
        CallerReference: callerReference,
        Paths: {
          Items: [
            this.path,
          ],
          Quantity: 1,
        },
      },
    }).promise();
  }
}
