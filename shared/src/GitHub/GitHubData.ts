import type { GitHubRepo } from './GitHubRepo.ts';

export interface GitHubData {
  homepageUrl: string;
  login: string;
  repos: GitHubRepo[];
  url: string;
}
