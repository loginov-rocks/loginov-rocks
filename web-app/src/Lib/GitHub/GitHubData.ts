import mockData from '@loginov-rocks/loginov-rocks-shared/src/__fixtures__/data.json';
import { Data } from '@loginov-rocks/loginov-rocks-shared/src/Data';

interface Options {
  url: string;
}

export class GitHubData {
  private readonly url: string;

  constructor({ url }: Options) {
    this.url = url;
  }

  get(): Promise<Data> {
    if (process.env.NODE_ENV !== 'production') {
      return Promise.resolve(mockData);
    }

    return fetch(this.url)
      .then((response) => response.json());
  }
}
