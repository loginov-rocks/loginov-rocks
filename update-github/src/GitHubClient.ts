import type { GitHubData, GitHubRepository } from '@loginov-rocks/loginov-rocks-shared';

export interface Repository {
  archived: boolean;
  description: null | string;
  homepage: null | string;
  html_url: string;
  language: null | string;
  name: string;
  owner: {
    login: string;
  };
  stargazers_count: number;
  updated_at: string;
}

export interface Tag {
  name: string;
}

export interface User {
  blog: string;
  html_url: string;
  login: string;
  repos_url: string;
}

interface Options {
  baseUrl: string;
  personalAccessToken?: string;
}

export class GitHubClient {
  private readonly baseUrl: string;
  private personalAccessToken: null | string = null;

  constructor({ baseUrl, personalAccessToken }: Options) {
    this.baseUrl = baseUrl;
    if (personalAccessToken) {
      this.personalAccessToken = personalAccessToken;
    }
  }

  public async getData(): Promise<GitHubData> {
    const user = await this.getAuthenticatedUser();
    const repositories = await this.getRepositories();

    return {
      homepageUrl: user.blog,
      login: user.login,
      repositories,
      url: user.html_url,
    };
  }

  public setPersonalAccessToken(personalAccessToken: string): void {
    this.personalAccessToken = personalAccessToken;
  }

  /**
   * @see https://docs.github.com/en/rest/users/users?apiVersion=2026-03-10#get-the-authenticated-user
   */
  private async getAuthenticatedUser(): Promise<User> {
    const response = await this.request('/user');

    if (!response.ok) {
      throw new Error('GitHub user request failed');
    }

    try {
      return await response.json() as User;
    } catch (error) {
      throw new Error('Failed to parse the GitHub user response as JSON', { cause: error });
    }
  }

  private async getRepositories(): Promise<GitHubRepository[]> {
    const repositories = await this.listRepositories();

    return Promise.all(repositories.map(async (repo) => {
      const tags = await this.listRepositoryTags(repo.owner.login, repo.name);

      return {
        description: repo.description,
        homepageUrl: repo.homepage,
        isArchived: repo.archived,
        language: repo.language,
        latestTag: tags.length > 0 ? tags[0].name : null,
        name: repo.name,
        stars: repo.stargazers_count,
        updatedAt: new Date(repo.updated_at).getTime(),
        url: repo.html_url,
      };
    }));
  }

  /**
   * @see https://docs.github.com/en/rest/repos/repos?apiVersion=2026-03-10#list-repositories-for-the-authenticated-user
   */
  private listRepositories(): Promise<Repository[]> {
    return this.requestAll<Repository>('/user/repos?affiliation=owner&per_page=100&sort=full_name&visibility=public');
  }

  /**
   * @see https://docs.github.com/en/rest/repos/repos?apiVersion=2026-03-10#list-repository-tags
   */
  private async listRepositoryTags(owner: string, repository: string): Promise<Tag[]> {
    const response = await this.request(`/repos/${owner}/${repository}/tags`);

    if (!response.ok) {
      throw new Error('GitHub tags request failed');
    }

    try {
      return await response.json() as Tag[];
    } catch (error) {
      throw new Error('Failed to parse the GitHub tags response as JSON', { cause: error });
    }
  }

  /**
   * @see https://docs.github.com/en/rest/using-the-rest-api/getting-started-with-the-rest-api?apiVersion=2026-03-10#making-a-request
   */
  private request(path: string): Promise<Response> {
    if (!this.personalAccessToken) {
      throw new Error('Personal access token is not set');
    }

    return fetch(`${this.baseUrl}${path}`, {
      headers: {
        'Authorization': `token ${this.personalAccessToken}`,
        'X-GitHub-Api-Version': '2026-03-10',
      },
    });
  }

  /**
   * @see https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2026-03-10
   */
  private async requestAll<T>(path: string): Promise<T[]> {
    const items = [];
    let nextPath: null | string = path;

    while (nextPath) {
      const response = await this.request(nextPath);

      if (!response.ok) {
        throw new Error('GitHub collection request failed');
      }

      let page: T[];
      try {
        page = await response.json() as T[];
      } catch (error) {
        throw new Error('Failed to parse the GitHub collection response as JSON', { cause: error });
      }
      items.push(...page);

      const next = /<(?<url>[^>]+)>;\s*rel="next"/.exec(response.headers.get('Link') ?? '');

      if (next?.groups) {
        const { pathname, search } = new URL(next.groups.url);
        nextPath = `${pathname}${search}`;
      } else {
        nextPath = null;
      }
    }

    return items;
  }
}
