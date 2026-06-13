import { authorize } from './authorize';

describe('authorize', () => {
  const username = 'username';
  const password = 'password';
  const validHeader = 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=';

  it('returns false when the header is missing', () => {
    expect(authorize(undefined, username, password)).toBe(false);
  });

  it('returns false when the header is invalid', () => {
    expect(authorize('', username, password)).toBe(false);
    expect(authorize('Basic', username, password)).toBe(false);
    expect(authorize('Basic invalid', username, password)).toBe(false);
    expect(authorize('Basic Og==', username, password)).toBe(false);
    expect(authorize('Basic dXNlcm5hbWU6', username, password)).toBe(false);
    expect(authorize('Basic nBhc3N3b3Jk', username, password)).toBe(false);
  });

  it('returns true when the header is valid', () => {
    expect(authorize(validHeader, username, password)).toBe(true);
  });
});
