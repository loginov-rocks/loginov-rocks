import { authorize } from './authorize';

it('returns false if header empty', () => {
  expect(authorize(undefined, 'username', 'password')).toBeFalsy();
});

it('returns false if header is invalid', () => {
  expect(authorize('', 'username', 'password')).toBeFalsy();
  expect(authorize('Basic', 'username', 'password')).toBeFalsy();
  expect(authorize('Basic invalid', 'username', 'password')).toBeFalsy();
  expect(authorize('Basic Og==', 'username', 'password')).toBeFalsy();
  expect(authorize('Basic dXNlcm5hbWU6', 'username', 'password')).toBeFalsy();
  expect(authorize('Basic nBhc3N3b3Jk', 'username', 'password')).toBeFalsy();
});

it('returns true if header is valid', () => {
  expect(authorize('Basic dXNlcm5hbWU6cGFzc3dvcmQ=', 'username', 'password')).toBeTruthy();
});
