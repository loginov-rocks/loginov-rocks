export const authorize = (header: string | undefined, username: string, password: string): boolean => {
  if (!header) {
    return false;
  }

  const credentials = `${username}:${password}`;
  const credentialsEncoded = Buffer.from(credentials).toString('base64');
  const validHeader = `Basic ${credentialsEncoded}`;

  return header === validHeader;
};
