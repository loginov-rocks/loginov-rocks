/* eslint-disable @typescript-eslint/no-var-requires, max-classes-per-file */

const { handler } = require('./index');

jest.mock('GitHub/GitHub', () => ({
  GitHub: class {
    // eslint-disable-next-line class-methods-use-this
    getData(): Promise<unknown> {
      return Promise.resolve('Mock');
    }
  },
}));

jest.mock('S3Object/S3Object', () => ({
  S3Object: class {
    // eslint-disable-next-line class-methods-use-this
    update(data: unknown): Promise<void> {
      if (data !== 'Mock') {
        return Promise.reject();
      }

      return Promise.resolve();
    }
  },
}));

describe('handler', () => {
  it('gets GitHub data and updates S3', async () => {
    const response = await handler();

    expect(response).toStrictEqual({});
  });
});
