import { GetSecretValueCommand, type SecretsManagerClient } from '@aws-sdk/client-secrets-manager';

import { CachedSecretsManagerClient } from './CachedSecretsManagerClient.ts';

jest.mock('@aws-sdk/client-secrets-manager', () => ({
  GetSecretValueCommand: jest.fn(),
}));

const GetSecretValueCommandMock = GetSecretValueCommand as unknown as jest.Mock;

describe('CachedSecretsManagerClient', () => {
  const secretArn = 'SECRET_ARN';
  const secret = { encoded: btoa('decoded-value'), plain: 'plain-value' };

  let send: jest.Mock;
  let secretsManagerClient: SecretsManagerClient;
  let cachedSecretsManagerClient: CachedSecretsManagerClient;

  beforeEach(() => {
    jest.clearAllMocks();

    send = jest.fn().mockResolvedValue({ SecretString: JSON.stringify(secret) });
    secretsManagerClient = { send } as unknown as SecretsManagerClient;
    cachedSecretsManagerClient = new CachedSecretsManagerClient({ secretArn, secretsManagerClient });
  });

  it('requests the secret by ARN and returns the value for the key', async () => {
    const value = await cachedSecretsManagerClient.getValue('plain');

    expect(GetSecretValueCommandMock).toHaveBeenCalledTimes(1);
    expect(GetSecretValueCommandMock).toHaveBeenCalledWith({ SecretId: secretArn });
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith(GetSecretValueCommandMock.mock.instances[0]);
    expect(value).toBe('plain-value');
  });

  it('decodes the value from base64 when requested', async () => {
    const value = await cachedSecretsManagerClient.getValue('encoded', { decodeBase64: true });

    expect(value).toBe('decoded-value');
  });

  it('fetches the secret only once across multiple calls', async () => {
    await cachedSecretsManagerClient.getValue('plain');
    await cachedSecretsManagerClient.getValue('encoded', { decodeBase64: true });

    expect(send).toHaveBeenCalledTimes(1);
  });

  it('throws when the key is missing', async () => {
    await expect(cachedSecretsManagerClient.getValue('missing')).rejects.toThrow('The secret has no "missing" key');
  });

  it('throws when the secret string is missing', async () => {
    send.mockResolvedValue({});

    await expect(cachedSecretsManagerClient.getValue('plain')).rejects.toThrow('The secret string is missing');
  });

  it('throws when the secret string is not valid JSON', async () => {
    send.mockResolvedValue({ SecretString: 'not-json' });

    await expect(cachedSecretsManagerClient.getValue('plain')).rejects
      .toThrow('Failed to parse the secret string as JSON');
  });
});
