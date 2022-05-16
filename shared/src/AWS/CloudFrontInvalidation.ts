import { CloudFront } from 'aws-sdk';
import { CreateInvalidationResult } from 'aws-sdk/clients/cloudfront';

interface Options {
  cloudFront: CloudFront;
  distributionId: string;
  path: string;
}

export class CloudFrontInvalidation {
  private readonly distributionId: string;

  private readonly path: string;

  private readonly cloudFront: CloudFront;

  constructor({ cloudFront, distributionId, path }: Options) {
    this.distributionId = distributionId;
    this.path = path;
    this.cloudFront = cloudFront;
  }

  invalidate(): Promise<CreateInvalidationResult> {
    // Create timestamp in the following format: "2021-02-22T12:40:57".
    const callerReference = new Date().toISOString().slice(0, 19);

    return this.cloudFront.createInvalidation({
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
