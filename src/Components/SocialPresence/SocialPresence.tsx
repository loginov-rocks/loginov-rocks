import * as React from 'react';

import { USERNAMES } from 'Constants';

const items = [
  <a href={`https://www.linkedin.com/in/${USERNAMES.LINKEDIN}/`}>LinkedIn</a>,
  <a href={`https://github.com/${USERNAMES.GITHUB}`}>GitHub</a>,
  <a href={`https://medium.com/@${USERNAMES.MEDIUM}`}>Medium</a>,
  <>
    <a href="https://www.drive2.com/r/toyota/chaser/288230376151952785/">DRIVE2</a>
    {' '}
    &mdash; my Toyota Chaser GX71 blog, originally
    {' '}
    <a href="https://www.drive2.ru/r/toyota/chaser/288230376151952785/">in Russian</a>
  </>,
  <a href={`https://www.instagram.com/${USERNAMES.INSTAGRAM}/`}>Instagram</a>,
  <a href={`https://www.facebook.com/${USERNAMES.FACEBOOK}`}>Facebook</a>,
  <a href={`https://twitter.com/${USERNAMES.TWITTER}`}>Twitter</a>,
  <a href={`https://www.npmjs.com/~${USERNAMES.NPM}`}>npm</a>,
];

const SocialPresence: React.FunctionComponent = () => (
  <ul>
    {/* eslint-disable-next-line react/no-array-index-key */}
    {items.map((item, index) => <li key={index}>{item}</li>)}
  </ul>
);

export default SocialPresence;
