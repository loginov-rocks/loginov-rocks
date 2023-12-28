import {
  CloudFrontClient, CreateInvalidationCommand, CreateInvalidationCommandOutput,
} from '@aws-sdk/client-cloudfront';

interface Options {
  cloudFrontClient: CloudFrontClient;
  distributionId: string;
  paths: string[];
}

export class CloudFrontInvalidation {
  private readonly cloudFrontClient: CloudFrontClient;

  private readonly distributionId: string;

  private readonly paths: string[];

  public constructor({ cloudFrontClient, distributionId, paths }: Options) {
    this.cloudFrontClient = cloudFrontClient;
    this.distributionId = distributionId;
    this.paths = paths;
  }

  public invalidate(): Promise<CreateInvalidationCommandOutput> {
    // Create timestamp in the following format: "2021-02-22T12:40:57".
    const callerReference = new Date().toISOString().slice(0, 19);

    const createInvalidationCommand = new CreateInvalidationCommand({
      DistributionId: this.distributionId,
      InvalidationBatch: {
        CallerReference: callerReference,
        Paths: {
          Items: this.paths,
          Quantity: this.paths.length,
        },
      },
    });

    return this.cloudFrontClient.send(createInvalidationCommand);
  }
}
