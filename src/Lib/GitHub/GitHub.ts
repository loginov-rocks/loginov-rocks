import GitHubOptions from './GitHubOptions';
import GitHubRepo from './GitHubRepo';

export default class GitHub {
  private readonly baseUrl: string = 'https://api.github.com';

  private readonly username: string;

  constructor({ username }: GitHubOptions) {
    this.username = username;
  }

  getRepos(): Promise<GitHubRepo[]> {
    return fetch(`${this.baseUrl}/users/${this.username}/repos`)
      .then((response) => response.json());
  }
}
