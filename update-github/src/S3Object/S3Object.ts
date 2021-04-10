import { S3 } from 'aws-sdk';

interface Options {
  bucketName: string;
  fileKey: string;
}

export class S3Object {
  private readonly bucketName: string;

  private readonly fileKey: string;

  private readonly s3: S3;

  constructor({ bucketName, fileKey }: Options) {
    this.bucketName = bucketName;
    this.fileKey = fileKey;
    this.s3 = new S3();
  }

  async update(data: unknown): Promise<void> {
    await this.s3.putObject({
      Body: JSON.stringify(data),
      Bucket: this.bucketName,
      ContentType: 'application/json',
      Key: this.fileKey,
    }).promise();
  }
}
