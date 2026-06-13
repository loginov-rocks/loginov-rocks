import { type CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';

import { CloudFrontInvalidation } from './CloudFrontInvalidation';

jest.mock('@aws-sdk/client-cloudfront', () => ({
  CreateInvalidationCommand: jest.fn(),
}));

const CreateInvalidationCommandMock = CreateInvalidationCommand as unknown as jest.Mock;

describe('CloudFrontInvalidation', () => {
  const distributionId = 'DISTRIBUTION_ID';
  const paths = ['/index.html', '/about.html'];
  const sendResult = { Invalidation: { Id: 'INVALIDATION_ID' } };

  let send: jest.Mock;
  let cloudFrontClient: CloudFrontClient;
  let cloudFrontInvalidation: CloudFrontInvalidation;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers().setSystemTime(new Date('2021-02-22T12:40:57.123Z'));

    send = jest.fn().mockResolvedValue(sendResult);
    cloudFrontClient = { send } as unknown as CloudFrontClient;
    cloudFrontInvalidation = new CloudFrontInvalidation({ cloudFrontClient, distributionId, paths });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should create the invalidation command with the expected batch', async () => {
    await cloudFrontInvalidation.invalidate();

    expect(CreateInvalidationCommandMock).toHaveBeenCalledTimes(1);
    expect(CreateInvalidationCommandMock).toHaveBeenCalledWith({
      DistributionId: distributionId,
      InvalidationBatch: {
        CallerReference: '2021-02-22T12:40:57',
        Paths: {
          Items: paths,
          Quantity: paths.length,
        },
      },
    });
  });

  it('should send the invalidation command and return the result', async () => {
    const result = await cloudFrontInvalidation.invalidate();

    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith(CreateInvalidationCommandMock.mock.instances[0]);
    expect(result).toBe(sendResult);
  });
});
