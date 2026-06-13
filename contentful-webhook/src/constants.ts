function requireValue(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable "${name}"`);
  }

  return value;
}

export const SECRET_ARN = requireValue('SECRET_ARN');
export const SECRET_CONTENTFUL_WEBHOOK_AUTH_PASSWORD_KEY = requireValue('SECRET_CONTENTFUL_WEBHOOK_AUTH_PASSWORD_KEY');
export const SECRET_CONTENTFUL_WEBHOOK_AUTH_USERNAME_KEY = requireValue('SECRET_CONTENTFUL_WEBHOOK_AUTH_USERNAME_KEY');

export const SQS_QUEUE_URL = requireValue('SQS_QUEUE_URL');
