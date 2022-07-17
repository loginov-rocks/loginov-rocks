import { SecretsManager } from 'aws-sdk';

interface Options {
  secretArn: string;
  secretsManager: SecretsManager;
}

export class KeyValueSecret {
  private readonly secretArn: string;

  private readonly secretsManager: SecretsManager;

  private secretPromise: Promise<Record<string, string>> | null = null;

  constructor({ secretArn, secretsManager }: Options) {
    this.secretArn = secretArn;
    this.secretsManager = secretsManager;
  }

  private async getSecret(): Promise<Record<string, string>> {
    const secretValueResponse = await this.secretsManager.getSecretValue({ SecretId: this.secretArn }).promise();

    if (!secretValueResponse.SecretString) {
      throw new Error('Secret string missing');
    }

    return JSON.parse(secretValueResponse.SecretString);
  }

  private getSecretPromise(): Promise<Record<string, string>> {
    if (!this.secretPromise) {
      this.secretPromise = this.getSecret();
    }

    return this.secretPromise;
  }

  public async getValue(key: string): Promise<string> {
    const secret = await this.getSecretPromise();

    if (secret[key] === undefined) {
      throw new Error(`Secret does not have "${key}" key or it is undefined`);
    }

    return secret[key];
  }
}
