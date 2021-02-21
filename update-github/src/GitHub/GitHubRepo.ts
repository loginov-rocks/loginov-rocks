/* eslint-disable camelcase */

export interface GitHubRepo {
  description: string | null;
  language: string | null;
  name: string;
  stargazers_count: number;
  tags_url: string;
  updated_at: string;
}
