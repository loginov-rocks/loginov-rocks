import { HELLO_WORLD } from 'Constants';

interface Response {
  body: string;
  statusCode: number;
}

exports.handler = async (): Promise<Response> => ({
  body: HELLO_WORLD,
  statusCode: 200,
});
