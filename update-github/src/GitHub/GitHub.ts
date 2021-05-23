import { GitHubData as Data, GitHubRepo as Repo } from '@loginov-rocks/loginov-rocks-shared';
import fetch, { Headers, Response } from 'node-fetch';

import { GitHubRepo } from './GitHubRepo';
import { GitHubTag } from './GitHubTag';
import { GitHubUser } from './GitHubUser';

interface Options {
  baseUrl: string;
  personalAccessToken: string;
}

export class GitHub {
  private static parseNextPageUrl(headers: Headers): string | undefined {
    const header = headers.get('Link');

    if (!header) {
      return undefined;
    }

    const links = header.split(',');
    const link = links.find((l) => l.endsWith('>; rel="next"'));

    if (!link) {
      return undefined;
    }

    return link.trim().substring(1).replace('>; rel="next"', '');
  }

  private static async mergeArrayResponses<T>(responsesStack: Response[]): Promise<T> {
    const results = await Promise.all(responsesStack.map((response) => {
      if (!response.ok) {
        throw new Error('GitHub one of the requests in merge array responses stack failed');
      }

      return response.json();
    }));

    const [firstResult, ...otherResults] = results;

    if (otherResults) {
      return firstResult.concat(...otherResults);
    }

    return firstResult;
  }

  private readonly baseUrl: string;

  private readonly personalAccessToken: string;

  constructor({ baseUrl, personalAccessToken }: Options) {
    this.baseUrl = baseUrl;
    this.personalAccessToken = personalAccessToken;
  }

  /**
   * @see https://docs.github.com/en/rest/overview/resources-in-the-rest-api#oauth2-token-sent-in-a-header
   */
  private apiGet(url: string): Promise<Response> {
    const apiUrl = url.startsWith(this.baseUrl) ? url : `${this.baseUrl}${url}`;

    return fetch(apiUrl, {
      headers: {
        Authorization: `token ${this.personalAccessToken}`,
      },
    });
  }

  /**
   * @see https://docs.github.com/en/rest/overview/resources-in-the-rest-api#pagination
   */
  private async apiGetWithPagination(url: string, responsesStack: Response[] = []): Promise<Response[]> {
    const response = await this.apiGet(url);

    responsesStack.push(response);

    const nextPageUrl = GitHub.parseNextPageUrl(response.headers);

    if (nextPageUrl) {
      return this.apiGetWithPagination(nextPageUrl, responsesStack);
    }

    return responsesStack;
  }

  /**
   * @see https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
   */
  private async getGitHubUser(): Promise<GitHubUser> {
    const response = await this.apiGet('/user');

    if (!response.ok) {
      throw new Error('GitHub get user request failed');
    }

    return response.json();
  }

  /**
   * @see https://docs.github.com/en/rest/reference/repos#list-repositories-for-the-authenticated-user
   */
  private async getGitHubRepos(): Promise<GitHubRepo[]> {
    const responsesStack = await this.apiGetWithPagination(
      '/user/repos?affiliation=owner&per_page=100&sort=full_name&visibility=public',
    );

    return GitHub.mergeArrayResponses<GitHubRepo[]>(responsesStack);
  }

  /**
   * @see https://docs.github.com/en/rest/reference/repos#list-repository-tags
   */
  private async getGitHubTags(ownerLogin: string, repoName: string): Promise<GitHubTag[]> {
    const response = await this.apiGet(`/repos/${ownerLogin}/${repoName}/tags`);

    if (!response.ok) {
      throw new Error('GitHub get tags request failed');
    }

    return response.json();
  }

  private async getRepos(): Promise<Repo[]> {
    const gitHubRepos = await this.getGitHubRepos();

    const repoToLatestTagMapping = await Promise.all(
      gitHubRepos.map(async (repo) => {
        const tags = await this.getGitHubTags(repo.owner.login, repo.name);

        return {
          latestTag: tags.length > 0 ? tags[0].name : '',
          repoName: repo.name,
        };
      }),
    );

    return gitHubRepos.map((repo) => {
      const repoToLatestTag = repoToLatestTagMapping.find(({ repoName }) => repoName === repo.name);
      const latestTag = repoToLatestTag ? repoToLatestTag.latestTag : '';

      return {
        description: repo.description || '',
        homepageUrl: repo.homepage || '',
        isArchived: repo.archived,
        language: repo.language || '',
        latestTag,
        name: repo.name,
        stars: repo.stargazers_count,
        updatedAt: new Date(repo.updated_at).getTime(),
        url: repo.html_url,
      };
    });
  }

  async getData(): Promise<Data> {
    const gitHubUser = await this.getGitHubUser();
    const repos = await this.getRepos();

    return {
      homepageUrl: gitHubUser.blog,
      login: gitHubUser.login,
      repos,
      timestamp: Date.now(),
      url: gitHubUser.html_url,
    };
  }
}
