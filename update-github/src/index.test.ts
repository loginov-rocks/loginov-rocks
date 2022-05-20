/* eslint-disable @typescript-eslint/no-var-requires, max-classes-per-file */

const { handler } = require('./index');

jest.mock('@loginov-rocks/loginov-rocks-shared', () => ({
  S3Object: class {
    // eslint-disable-next-line class-methods-use-this
    read(): Promise<string> {
      return Promise.resolve('"CurrentMock"');
    }

    // eslint-disable-next-line class-methods-use-this
    write(data: string): Promise<void> {
      if (data !== '"NewMock"') {
        return Promise.reject();
      }

      return Promise.resolve();
    }
  },
}));

jest.mock('GitHub/GitHub', () => ({
  GitHub: class {
    // eslint-disable-next-line class-methods-use-this
    getData(): Promise<unknown> {
      return Promise.resolve('NewMock');
    }
  },
}));

describe('handler', () => {
  it('gets GitHub data and updates S3', async () => {
    const response = await handler();

    expect(response).toStrictEqual({});
  });
});
