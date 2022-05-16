import { S3 } from 'aws-sdk';
import {
  ContentType, DeleteObjectOutput, PutObjectOutput, PutObjectRequest,
} from 'aws-sdk/clients/s3';

interface Options {
  bucketName: string;
  fileKey: string;
  s3: S3;
}

interface BatchOptions {
  bucketName: string;
  fileKey: string;
}

interface WriteOptions {
  contentType?: ContentType;
}

export class S3Object {
  private readonly bucketName: string;

  private readonly fileKey: string;

  private readonly s3: S3;

  constructor({ bucketName, fileKey, s3 }: Options) {
    this.bucketName = bucketName;
    this.fileKey = fileKey;
    this.s3 = s3;
  }

  static batchRead(s3: S3, batchOptions: BatchOptions[]): Promise<string[]> {
    return Promise.all(
      batchOptions.map(({ bucketName, fileKey }) => {
        const s3Object = new this({ bucketName, fileKey, s3 });

        return s3Object.read();
      }),
    );
  }

  static batchDelete(s3: S3, batchOptions: BatchOptions[]): Promise<DeleteObjectOutput[]> {
    return Promise.all(
      batchOptions.map(({ bucketName, fileKey }) => {
        const s3Object = new this({ bucketName, fileKey, s3 });

        return s3Object.delete();
      }),
    );
  }

  async read(): Promise<string> {
    let object;

    try {
      object = await this.s3.getObject({
        Bucket: this.bucketName,
        Key: this.fileKey,
      }).promise();
    } catch (error: any) {
      if (error.code !== 'NoSuchKey') {
        throw new Error(`S3 GetObject failed: ${this.fileKey}`);
      }
    }

    if (!object || !object.Body) {
      return '';
    }

    return object.Body.toString();
  }

  write(data: Buffer | string, options: WriteOptions = {}): Promise<PutObjectOutput> {
    const params: PutObjectRequest = {
      Body: data,
      Bucket: this.bucketName,
      Key: this.fileKey,
    };

    if (options.contentType) {
      params.ContentType = options.contentType;
    }

    return this.s3.putObject(params).promise();
  }

  async append(data: string): Promise<PutObjectOutput> {
    const existingData = await this.read();

    return this.write(existingData + data);
  }

  delete(): Promise<DeleteObjectOutput> {
    return this.s3.deleteObject({
      Bucket: this.bucketName,
      Key: this.fileKey,
    }).promise();
  }
}
