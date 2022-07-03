import { SecretsManager } from 'aws-sdk';
import { GetSecretValueResponse } from 'aws-sdk/clients/secretsmanager';

interface Options {
  secretArn: string;
  secretsManager: SecretsManager;
}

export class KeyValueSecret {
  private readonly secretArn: string;

  private readonly secretsManager: SecretsManager;

  private getSecretValuePromise: Promise<GetSecretValueResponse> | null = null;

  constructor({ secretArn, secretsManager }: Options) {
    this.secretArn = secretArn;
    this.secretsManager = secretsManager;
  }

  private getSecretValue(): Promise<GetSecretValueResponse> {
    if (!this.getSecretValuePromise) {
      this.getSecretValuePromise = this.secretsManager.getSecretValue({ SecretId: this.secretArn }).promise();
    }

    return this.getSecretValuePromise;
  }

  async getValue(key: string): Promise<string> {
    const secretValue = await this.getSecretValue();

    if (!secretValue.SecretString) {
      throw new Error('Secret string missing');
    }

    const secrets = JSON.parse(secretValue.SecretString);

    return secrets[key];
  }
}
