import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';

interface Options {
  secretArn: string;
  secretsManagerClient: SecretsManagerClient;
}

interface GetValueOptions {
  decodeBase64: boolean;
}

export class CachedSecretsManagerClient {
  private readonly secretArn: string;

  private readonly secretsManagerClient: SecretsManagerClient;

  private secretPromise: Promise<Record<string, string>> | null = null;

  constructor({ secretArn, secretsManagerClient }: Options) {
    this.secretArn = secretArn;
    this.secretsManagerClient = secretsManagerClient;
  }

  public async getValue(key: string, options: GetValueOptions = { decodeBase64: false }): Promise<string> {
    const secret = await this.getSecretPromise();

    if (secret[key] === undefined) {
      throw new Error(`The secret has no "${key}" key, or its value is undefined`);
    }

    if (options.decodeBase64) {
      return atob(secret[key]);
    }

    return secret[key];
  }

  private async getSecret(): Promise<Record<string, string>> {
    const getSecretValueCommand = new GetSecretValueCommand({ SecretId: this.secretArn });
    const secretsManagerResponse = await this.secretsManagerClient.send(getSecretValueCommand);

    if (!secretsManagerResponse.SecretString) {
      throw new Error('The secret string is missing');
    }

    return JSON.parse(secretsManagerResponse.SecretString);
  }

  private getSecretPromise(): Promise<Record<string, string>> {
    if (!this.secretPromise) {
      this.secretPromise = this.getSecret();
    }

    return this.secretPromise;
  }
}
