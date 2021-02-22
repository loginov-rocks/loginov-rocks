import { GitHub } from './GitHub';

jest.mock('@octokit/rest', () => ({
  Octokit: class {
    // eslint-disable-next-line class-methods-use-this
    request(url: string): Promise<unknown> {
      if (url === '/user') {
        // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
        const data = require('./__fixtures__/gitHubUser.json');
        return Promise.resolve({ data });
      }

      if (url === 'https://api.github.com/users/loginov-rocks/repos') {
        // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
        const data = require('./__fixtures__/gitHubRepos.json');
        return Promise.resolve({ data });
      }

      return Promise.reject();
    }
  },
}));

const gitHub = new GitHub({ personalAccessToken: 'personal-access-token' });

describe('getData', () => {
  it('gets GitHub data using API', async () => {
    const data = await gitHub.getData();

    expect(data).toStrictEqual(
      expect.objectContaining({
        homepageUrl: 'https://loginov.rocks',
        url: 'https://github.com/loginov-rocks',
        user: 'loginov-rocks',
      }),
    );
    expect(typeof data.timestamp).toBe('number');

    expect(Array.isArray(data.repos)).toBeTruthy();
    expect(data.repos.length).toBe(30);

    expect(data.repos[0]).toStrictEqual({
      description: 'Clean but full featured AngularJS boilerplate using Gulp workflow and best practices',
      homepageUrl: 'https://www.npmjs.com/package/angular-gulp-boilerplate',
      language: 'JavaScript',
      latestVersion: '',
      stars: 29,
      title: 'Angular-Gulp-Boilerplate',
      updatedAt: 1613486363000,
      url: 'https://github.com/loginov-rocks/Angular-Gulp-Boilerplate',
    });

    expect(data.repos).toMatchSnapshot();
  });
});
