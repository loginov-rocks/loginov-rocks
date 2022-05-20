/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */

import { GitHub } from './GitHub';

// eslint-disable-next-line global-require
jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());
const fetchMock = require('node-fetch');

const gitHubRepos = require('./__fixtures__/gitHubRepos.json');
const gitHubTagsMock = require('./__fixtures__/gitHubTags.json');
const gitHubUserMock = require('./__fixtures__/gitHubUser.json');

const gitHubReposMock = gitHubRepos.slice(0, 3);

const gitHub = new GitHub({
  baseUrl: 'https://api.github.com',
  personalAccessToken: 'personal-access-token',
});

describe('getData', () => {
  it('gets GitHub data using API', async () => {
    fetchMock.get('https://api.github.com/user', gitHubUserMock)
      .get(
        'https://api.github.com/user/repos?affiliation=owner&per_page=100&sort=full_name&visibility=public',
        gitHubReposMock,
      )
      .get('https://api.github.com/repos/loginov-rocks/Angular-Gulp-Boilerplate/tags', gitHubTagsMock)
      .get('https://api.github.com/repos/loginov-rocks/Anticloud/tags', gitHubTagsMock)
      .get('https://api.github.com/repos/loginov-rocks/anticloud-server/tags', gitHubTagsMock);

    const data = await gitHub.getData();

    fetchMock.reset();

    expect(data).toStrictEqual(
      expect.objectContaining({
        homepageUrl: 'https://loginov.rocks',
        login: 'loginov-rocks',
        url: 'https://github.com/loginov-rocks',
      }),
    );

    expect(Array.isArray(data.repos)).toBeTruthy();
    expect(data.repos.length).toBe(3);

    expect(data.repos[0]).toStrictEqual({
      description: 'Clean but full featured AngularJS boilerplate using Gulp workflow and best practices',
      homepageUrl: 'https://www.npmjs.com/package/angular-gulp-boilerplate',
      isArchived: false,
      language: 'JavaScript',
      latestTag: 'v1.0.10',
      name: 'Angular-Gulp-Boilerplate',
      stars: 29,
      updatedAt: 1614276648000,
      url: 'https://github.com/loginov-rocks/Angular-Gulp-Boilerplate',
    });

    expect(data.repos).toMatchSnapshot();
  });
});
