import { Repo } from './Repo';

export interface Data {
  homepageUrl: string;
  repos: Repo[];
  timestamp: number;
  url: string;
  user: string;
}
