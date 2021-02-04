/**
 * AWS Lambda@Edge for the Main CloudFront Distribution, triggered on Origin Response.
 *
 * This function is triggered when Origin, which is an S3 bucket in the project, returns a response to the CloudFront
 * Distribution.
 *
 * @see https://aws.amazon.com/blogs/networking-and-content-delivery/generating-dynamic-error-responses-in-amazon-cloudfront-with-lambdaedge/
 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-requirements-limits.html#lambda-requirements-cloudfront-triggers
 */

const RESPONSE_BODY = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Virtual URLs are not supported yet</title>
    </head>
    <body>
        <h1>Virtual URLs are not supported yet</h1>
    </body>
</html>`;

exports.handler = (event, context, callback) => {
  const { response } = event.Records[0].cf;

  // Intercept Forbidden and Not Found errors sent from the S3 and override to support virtual URLs required for the
  // Single Page Application.
  //
  // For some reason CloudFront Distribution doesn't trigger Custom Error Responses for the non-default origin when
  // having multi-origin setup, so this function used to cover that issue.
  if (response.status === '403' || response.status === '404') {
    // TODO: Return app index.html instead, it can be received dynamically via http.get(), but a test needed to
    //  understand performance metrics.
    //  @see https://andrewlock.net/using-lambda-at-edge-to-handle-angular-client-side-routing-with-s3-and-cloudfront/
    response.body = RESPONSE_BODY;
    response.headers['content-type'] = [
      {
        key: 'Content-Type',
        value: 'text/html',
      },
    ];
    response.status = 200;
    response.statusDescription = 'OK';
  }

  // Enforce HTTP Strict Transport Security.
  // @see https://infosec.mozilla.org/guidelines/web_security#http-strict-transport-security
  // @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  response.headers['strict-transport-security'] = [
    {
      key: 'Strict-Transport-Security',
      value: `max-age=${365 * 24 * 60 * 60}; includeSubdomains; preload`,
    },
  ];

  // Prevent browsers from incorrectly detecting non-scripts as scripts.
  // @see https://infosec.mozilla.org/guidelines/web_security#x-content-type-options
  // @see https://developer.mozilla.org/en-us/docs/Web/HTTP/Headers/X-Content-Type-Options
  response.headers['x-content-type-options'] = [
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
  ];

  // Block site from being framed.
  // @see https://infosec.mozilla.org/guidelines/web_security#x-frame-options
  // @see https://developer.mozilla.org/en-us/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors
  // @see https://developer.mozilla.org/en-us/docs/Web/HTTP/Headers/X-Frame-Options
  response.headers['content-security-policy'] = [
    {
      key: 'Content-Security-Policy',
      value: 'frame-ancestors \'none\'',
    },
  ];
  response.headers['x-frame-options'] = [
    {
      key: 'X-Frame-Options',
      value: 'DENY',
    },
  ];

  callback(null, response);
};
