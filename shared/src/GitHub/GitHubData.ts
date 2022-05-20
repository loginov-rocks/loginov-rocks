import { GitHubRepo } from './GitHubRepo';

export interface GitHubData {
  homepageUrl: string;
  login: string;
  repos: GitHubRepo[];
  url: string;
}
