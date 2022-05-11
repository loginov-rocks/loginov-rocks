import { GitHubData } from './GitHubData';

export class HomeRoute {
  constructor({ gitHubDataUrl }) {
    this.gitHubDataUrl = gitHubDataUrl;
  }

  async getData() {
    const getGitHubData = new GitHubData({ url: this.gitHubDataUrl });
    const gitHubData = await getGitHubData.get();

    return { gitHubData };
  }
}
