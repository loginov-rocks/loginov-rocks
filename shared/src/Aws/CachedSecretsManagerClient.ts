import { GetSecretValueCommand, type SecretsManagerClient } from '@aws-sdk/client-secrets-manager';

interface GetValueOptions {
  decodeBase64?: boolean;
}

interface Options {
  secretArn: string;
  secretsManagerClient: SecretsManagerClient;
}

type Secret = Record<string, string>;

export class CachedSecretsManagerClient {
  private readonly secretArn: string;
  private secretPromise: null | Promise<Secret> = null;
  private readonly secretsManagerClient: SecretsManagerClient;

  constructor({ secretArn, secretsManagerClient }: Options) {
    this.secretArn = secretArn;
    this.secretsManagerClient = secretsManagerClient;
  }

  public async getValue(key: string, { decodeBase64 = false }: GetValueOptions): Promise<string> {
    const secret = await this.getSecretPromise();

    if (!secret[key]) {
      throw new Error(`The secret has no "${key}" key`);
    }

    if (decodeBase64) {
      return atob(secret[key]);
    }

    return secret[key];
  }

  private async getSecret(): Promise<Secret> {
    const getSecretValueCommand = new GetSecretValueCommand({ SecretId: this.secretArn });
    const secretsManagerResponse = await this.secretsManagerClient.send(getSecretValueCommand);

    if (!secretsManagerResponse.SecretString) {
      throw new Error('The secret string is missing');
    }

    try {
      return JSON.parse(secretsManagerResponse.SecretString) as Secret;
    } catch (error) {
      throw new Error('Failed to parse the secret string as JSON', { cause: error });
    }
  }

  private getSecretPromise(): Promise<Secret> {
    this.secretPromise ??= this.getSecret();

    return this.secretPromise;
  }
}
