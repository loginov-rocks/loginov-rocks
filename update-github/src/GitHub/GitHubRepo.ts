/* eslint-disable camelcase */

export interface GitHubRepo {
  archived: boolean;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  name: string;
  owner: {
    login: string;
  };
  stargazers_count: number;
  tags_url: string;
  updated_at: string;
}
