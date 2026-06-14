describe('constants', () => {
  const originalEnvironment = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...originalEnvironment,
      DATA_BUCKET_NAME: 'data-bucket-name',
      DATA_GITHUB_FILE_KEY: 'data-github-file-key',
      GITHUB_BASE_URL: 'github-base-url',
      PERSONAL_ACCESS_TOKEN_PARAMETER_NAME: 'personal-access-token',
      SECRET_ARN: 'secret-arn',
      SECRET_UPDATE_GITHUB_GITHUB_PERSONAL_ACCESS_TOKEN_KEY: 'personal-access-token-key',
    };
  });

  afterEach(() => {
    process.env = originalEnvironment;
  });

  it('exports the values from the environment', async () => {
    const constants = await import('./constants.ts');

    expect(constants.DATA_BUCKET_NAME).toBe('data-bucket-name');
    expect(constants.DATA_GITHUB_FILE_KEY).toBe('data-github-file-key');
    expect(constants.GITHUB_BASE_URL).toBe('github-base-url');
    expect(constants.PERSONAL_ACCESS_TOKEN_PARAMETER_NAME).toBe('personal-access-token');
    expect(constants.SECRET_ARN).toBe('secret-arn');
    expect(constants.SECRET_UPDATE_GITHUB_GITHUB_PERSONAL_ACCESS_TOKEN_KEY).toBe('personal-access-token-key');
  });

  it('throws when a required environment variable is missing', async () => {
    delete process.env.DATA_BUCKET_NAME;

    await expect(import('./constants.ts')).rejects.toThrow('Missing required environment variable "DATA_BUCKET_NAME"');
  });
});
