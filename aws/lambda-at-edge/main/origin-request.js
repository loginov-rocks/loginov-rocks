/**
 * AWS Lambda@Edge for the Main CloudFront Distribution, triggered on Origin Request.
 *
 * This function is triggered when CloudFront Distribution doesn't have a cache to serve for a particular request (cache
 * miss) and makes a request to the Origin, which is an S3 bucket in the project, to get actual contents.
 *
 * @see https://aws.amazon.com/blogs/networking-and-content-delivery/dynamically-route-viewer-requests-to-any-origin-using-lambdaedge/
 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-requirements-limits.html#lambda-requirements-cloudfront-triggers
 * @see https://medium.com/buildit/a-b-testing-on-aws-cloudfront-with-lambda-edge-a22dd82e9d12
 * @see https://github.com/nicusX/cloudfront-ab-testing
 */

// Lambda@Edge doesn't have access to the environment variables.
const CANARY_ORIGIN = 'canary-loginov-rocks.s3.amazonaws.com';
const CANARY_ROLLOUT = 0; // %

const COOKIE_NAME = 'origin';
const COOKIE_STABLE_VALUE = 'stable';
const COOKIE_CANARY_VALUE = 'canary';

exports.handler = (event, context, callback) => {
  const { request } = event.Records[0].cf;

  // Skip handler in case of no Canary rollout.
  if (CANARY_ROLLOUT === 0) {
    callback(null, request);
    return;
  }

  let cookieValue = null;

  // Check request headers for the cookie representing requested version.
  if (request.headers.cookie) {
    const stableCookie = `${COOKIE_NAME}=${COOKIE_STABLE_VALUE}`;
    const canaryCookie = `${COOKIE_NAME}=${COOKIE_CANARY_VALUE}`;

    for (let i = 0; i < request.headers.cookie.length; i += 1) {
      if (request.headers.cookie[i].value.indexOf(stableCookie) >= 0) {
        console.log('Stable cookie found');
        cookieValue = COOKIE_STABLE_VALUE;
        break;
      }
      if (request.headers.cookie[i].value.indexOf(canaryCookie) >= 0) {
        console.log('Canary cookie found');
        cookieValue = COOKIE_CANARY_VALUE;
        break;
      }
    }
  }

  if (!cookieValue) {
    // Roll the dice with a configured probability.
    const newCookieValue = (Math.random() < (1 - CANARY_ROLLOUT / 100)) ? COOKIE_STABLE_VALUE : COOKIE_CANARY_VALUE;

    console.log('No cookie found, set:', newCookieValue);

    // Redirect user to the same URI, but set cookie to remember the version
    // defined. The cookie set for the browser session only.
    callback(null, {
      headers: {
        'cache-control': [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
        location: [
          {
            key: 'Location',
            // Redirect to the root if index.html requested to maintain URL consistency.
            value: request.uri === '/index.html' ? '/' : request.uri,
          },
        ],
        'set-cookie': [
          {
            key: 'Set-Cookie',
            value: `${COOKIE_NAME}=${newCookieValue}; Path=/`,
          },
        ],
      },
      status: 302,
    });
    return;
  }

  // Route request to the Canary Origin.
  if (cookieValue === COOKIE_CANARY_VALUE) {
    request.headers.host = [{ key: 'host', value: CANARY_ORIGIN }];
    request.origin.s3.domainName = CANARY_ORIGIN;
  }

  callback(null, request);
};
