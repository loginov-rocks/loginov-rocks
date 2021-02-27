import { GitHubData as Data, GitHubRepo as Repo } from '@loginov-rocks/loginov-rocks-shared';
import fetch, { Headers, Response } from 'node-fetch';

import { GitHubRepo } from './GitHubRepo';
import { GitHubUser } from './GitHubUser';

interface Options {
  baseUrl: string;
  personalAccessToken: string;
}

interface GetReposFilter {
  // eslint-disable-next-line no-unused-vars
  (gitHubRepo: GitHubRepo): boolean;
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
    const results = await Promise.all(responsesStack.map((response) => response.json()));

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

  private apiGet(url: string): Promise<Response> {
    const apiUrl = url.startsWith(this.baseUrl) ? url : `${this.baseUrl}${url}`;

    return fetch(apiUrl, {
      headers: {
        Authorization: `token ${this.personalAccessToken}`,
      },
    });
  }

  private async apiGetWithPagination(url: string, responsesStack: Response[] = []): Promise<Response[]> {
    const response = await this.apiGet(url);

    responsesStack.push(response);

    const nextPageUrl = GitHub.parseNextPageUrl(response.headers);

    if (nextPageUrl) {
      return this.apiGetWithPagination(nextPageUrl, responsesStack);
    }

    return responsesStack;
  }

  private async getGitHubUser(): Promise<GitHubUser> {
    const response = await this.apiGet('/user');

    return response.json();
  }

  private async getGitHubRepos(): Promise<GitHubRepo[]> {
    const responsesStack = await this.apiGetWithPagination('/user/repos');

    return GitHub.mergeArrayResponses<GitHubRepo[]>(responsesStack);
  }

  private async getRepos(filter: GetReposFilter = () => true): Promise<Repo[]> {
    const gitHubRepos = await this.getGitHubRepos();

    return gitHubRepos
      .filter(filter)
      .map((repo) => ({
        description: repo.description || '',
        homepageUrl: repo.homepage || '',
        isArchived: repo.archived,
        language: repo.language || '',
        // TODO
        latestTag: '',
        name: repo.name,
        stars: repo.stargazers_count,
        updatedAt: new Date(repo.updated_at).getTime(),
        url: repo.html_url,
      }));
  }

  async getData(): Promise<Data> {
    const gitHubUser = await this.getGitHubUser();
    const repos = await this.getRepos((gitHubRepo) => gitHubRepo.owner.login === gitHubUser.login);

    return {
      homepageUrl: gitHubUser.blog,
      login: gitHubUser.login,
      repos,
      timestamp: Date.now(),
      url: gitHubUser.html_url,
    };
  }
}
