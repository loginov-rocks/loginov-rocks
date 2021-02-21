import GitHub from './GitHub';

const gitHub = new GitHub({ username: 'username' });

beforeEach(() => {
  // @ts-ignore
  fetch.resetMocks();
});

describe('getRepos', () => {
  it('fetches user\'s repos', () => {
    // @ts-ignore
    fetch.mockResponse(JSON.stringify(([{ name: 'repo' }])));

    const promise = gitHub.getRepos().then((repos) => {
      expect(repos).toStrictEqual([{ name: 'repo' }]);
    });

    // @ts-ignore
    expect(fetch.mock.calls.length).toEqual(1);
    // @ts-ignore
    expect(fetch.mock.calls[0][0]).toEqual('https://api.github.com/users/username/repos');

    return promise;
  });
});

describe('getTags', () => {
  it('fetches tags for the user\'s repo', () => {
    // @ts-ignore
    fetch.mockResponse(JSON.stringify(([{ name: 'v1.0.0' }])));

    const promise = gitHub.getTags('repo').then((repos) => {
      expect(repos).toStrictEqual([{ name: 'v1.0.0' }]);
    });

    // @ts-ignore
    expect(fetch.mock.calls.length).toEqual(1);
    // @ts-ignore
    expect(fetch.mock.calls[0][0]).toEqual('https://api.github.com/repos/username/repo/tags');

    return promise;
  });
});
