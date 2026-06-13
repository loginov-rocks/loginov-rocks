function requireValue(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable "${name}"`);
  }

  return value;
}

export const DATA_BUCKET_NAME = requireValue('DATA_BUCKET_NAME');
export const DATA_GITHUB_FILE_KEY = requireValue('DATA_GITHUB_FILE_KEY');

export const GITHUB_BASE_URL = requireValue('GITHUB_BASE_URL');

export const SECRET_ARN = requireValue('SECRET_ARN');
export const SECRET_UPDATE_GITHUB_GITHUB_PERSONAL_ACCESS_TOKEN_KEY
  = requireValue('SECRET_UPDATE_GITHUB_GITHUB_PERSONAL_ACCESS_TOKEN_KEY');
