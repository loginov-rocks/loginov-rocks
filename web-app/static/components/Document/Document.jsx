import PropTypes from 'prop-types';
import * as React from 'react';

export const Document = ({
  Body, children, Head, Html,
}) => (
  <Html>
    <Head>
      <meta charset="utf-8" />
      <meta content="Personal Website of Danila Loginov" name="description" />
      <meta content="all" name="robots" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <title>Danila Loginov</title>
      <link href="/manifest.json" rel="manifest" />
    </Head>
    <Body>
      {children}
    </Body>
  </Html>
);

Document.propTypes = {
  Body: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.array,
  ]).isRequired,
  Head: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
  Html: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
};
