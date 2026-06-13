import type { GitHubRepository } from './GitHubRepository.ts';

export interface GitHubData {
  homepageUrl: string;
  login: string;
  repositories: GitHubRepository[];
  url: string;
}
