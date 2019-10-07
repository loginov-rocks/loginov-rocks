import GitHubOptions from './GitHubOptions';
import GitHubRepo from './GitHubRepo';

export default class GitHub {
  private readonly baseUrl: string = 'https://api.github.com';

  private readonly username: string;

  private static parseNextPageUrl(headers: Headers): string | undefined {
    const header = headers.get('Link');

    if (!header) {
      return undefined;
    }

    const links = header.split(',');
    const link = links.find((l) => l.endsWith('>; rel="next"'));

    if (!link) {
      return undefined;
    }

    return link.trim().substring(1).replace('>; rel="next"', '');
  }

  private static fetchAll(url: string, responsesStack: Response[] = []): Promise<Response[]> {
    return fetch(url).then((response) => {
      responsesStack.push(response);

      const nextPage = this.parseNextPageUrl(response.headers);

      if (nextPage) {
        return this.fetchAll(nextPage, responsesStack);
      }

      return responsesStack;
    });
  }

  private static mergeJsonResponses<T>(responsesStack: Response[]): Promise<T> {
    return Promise.all(responsesStack.map((response) => response.json()))
      .then((results) => {
        const [firstResult, ...otherResults] = results;

        if (otherResults) {
          return firstResult.concat(...otherResults);
        }

        return firstResult;
      });
  }

  constructor({ username }: GitHubOptions) {
    this.username = username;
  }

  getRepos(): Promise<GitHubRepo[]> {
    // Avoid GitHub API throttling while developing.
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
      return Promise.resolve(require('./__fixtures__/repos.json'));
    }

    return GitHub.fetchAll(`${this.baseUrl}/users/${this.username}/repos`)
      .then((responses) => GitHub.mergeJsonResponses<GitHubRepo[]>(responses))
      .catch(() => []);
  }
}
