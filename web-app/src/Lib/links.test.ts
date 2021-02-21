import { toGitHub, toNpm } from './links';

jest.mock('Constants', () => ({
  USERNAMES: {
    GITHUB: 'username',
  },
}));

describe('toGitHub', () => {
  it('matches inline snapshot', () => {
    expect(toGitHub('name')).toMatchInlineSnapshot('"https://github.com/username/name"');
  });
});

describe('toNpm', () => {
  it('matches inline snapshot', () => {
    expect(toNpm('name')).toMatchInlineSnapshot('"https://www.npmjs.com/package/name"');
  });
});
