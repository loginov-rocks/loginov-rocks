/*
import { GitHubData as Data } from '@loginov-rocks/loginov-rocks-shared';
 */
import axios from 'axios';

/*
interface Options {
  url: string;
}
 */

export class GitHubData {
  /*
  private readonly url: string;
   */

  constructor({ url }/* : Options */) {
    this.url = url;
  }

  get()/* : Promise<Data> */ {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line global-require
      const gitHubMockData = require('@loginov-rocks/loginov-rocks-shared/src/GitHub/__fixtures__/data.json');

      return Promise.resolve(gitHubMockData);
    }

    return axios.get(this.url)
      .then(({ data }) => data);
  }
}
