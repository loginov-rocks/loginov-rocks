import { GitHubData as Data, GitHubRepo as Repo } from '@loginov-rocks/loginov-rocks-shared';
import { Octokit } from '@octokit/rest';

import { GitHubRepo } from './GitHubRepo';
import { GitHubUser } from './GitHubUser';

interface Options {
  personalAccessToken: string;
}

export class GitHub {
  private readonly octokit: Octokit;

  constructor({ personalAccessToken }: Options) {
    this.octokit = new Octokit({
      auth: personalAccessToken,
    });
  }

  private async getRepos(url: string): Promise<Repo[]> {
    const response = await this.octokit.request(url);
    const gitHubRepos = response.data as GitHubRepo[];

    return gitHubRepos.map((repo) => ({
      description: repo.description || '',
      homepageUrl: repo.homepage || '',
      language: repo.language || '',
      // TODO
      latestVersion: '',
      stars: repo.stargazers_count,
      title: repo.name,
      updatedAt: new Date(repo.updated_at).getTime(),
      url: repo.html_url,
    }));
  }

  async getData(): Promise<Data> {
    const response = await this.octokit.request('/user');
    const gitHubUser = response.data as GitHubUser;

    const repos = await this.getRepos(gitHubUser.repos_url);

    return {
      homepageUrl: gitHubUser.blog,
      repos,
      timestamp: Date.now(),
      url: gitHubUser.html_url,
      user: gitHubUser.login,
    };
  }
}
