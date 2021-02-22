import { gitHubMockData, GitHubData as Data } from '@loginov-rocks/loginov-rocks-shared';

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
      return Promise.resolve(gitHubMockData);
    }

    return fetch(this.url)
      .then((response) => response.json());
  }
}
