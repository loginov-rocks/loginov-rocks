import { Repo } from './Repo';

export interface Data {
  homepageUrl: string;
  login: string;
  repos: Repo[];
  timestamp: number;
  url: string;
}
