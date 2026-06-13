describe('constants', () => {
  const originalEnvironment = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...originalEnvironment,
      SECRET_ARN: 'secret-arn',
      SECRET_CONTENTFUL_WEBHOOK_AUTH_PASSWORD_KEY: 'password-key',
      SECRET_CONTENTFUL_WEBHOOK_AUTH_USERNAME_KEY: 'username-key',
      SQS_QUEUE_URL: 'sqs-queue-url',
    };
  });

  afterEach(() => {
    process.env = originalEnvironment;
  });

  it('exports the values from the environment', async () => {
    const constants = await import('./constants.ts');

    expect(constants.SECRET_ARN).toBe('secret-arn');
    expect(constants.SECRET_CONTENTFUL_WEBHOOK_AUTH_PASSWORD_KEY).toBe('password-key');
    expect(constants.SECRET_CONTENTFUL_WEBHOOK_AUTH_USERNAME_KEY).toBe('username-key');
    expect(constants.SQS_QUEUE_URL).toBe('sqs-queue-url');
  });

  it('throws when a required environment variable is missing', async () => {
    delete process.env.SECRET_ARN;

    await expect(import('./constants.ts')).rejects.toThrow('Missing required environment variable "SECRET_ARN"');
  });
});
