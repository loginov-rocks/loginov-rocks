/* eslint-disable @typescript-eslint/no-var-requires */

const { handler } = require('index');

it('returns status code 200', async () => {
  const response = await handler();

  expect(response.statusCode).toBe(200);
});

it('returns the same response', async () => {
  const response = await handler();

  expect(response.body).toMatchSnapshot();
});
