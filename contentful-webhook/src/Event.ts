export interface Event {
  body: string;
  headers: {
    authorization: string;
  };
  isBase64Encoded: boolean;
  requestContext: {
    http: {
      method: string;
    };
  };
}
