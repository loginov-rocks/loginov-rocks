import * as React from 'react';

import { Link } from 'Components/Link';
import { USERNAMES } from 'Constants';

const items = [
  <Link href={`https://www.linkedin.com/in/${USERNAMES.LINKEDIN}/`}>LinkedIn</Link>,
  <Link href={`https://github.com/${USERNAMES.GITHUB}`}>GitHub</Link>,
  <Link href={`https://medium.com/@${USERNAMES.MEDIUM}`}>Medium</Link>,
  <>
    <Link href="https://www.drive2.com/r/toyota/chaser/288230376151952785/">DRIVE2</Link>
    {' '}
    &mdash; my Toyota Chaser GX71 blog, originally
    {' '}
    <Link href="https://www.drive2.ru/r/toyota/chaser/288230376151952785/">in Russian</Link>
  </>,
  <Link href={`https://www.instagram.com/${USERNAMES.INSTAGRAM}/`}>Instagram</Link>,
  <Link href={`https://www.facebook.com/${USERNAMES.FACEBOOK}`}>Facebook</Link>,
  <Link href={`https://twitter.com/${USERNAMES.TWITTER}`}>Twitter</Link>,
  <Link href={`https://www.npmjs.com/~${USERNAMES.NPM}`}>npm</Link>,
];

export const SocialPresence: React.FunctionComponent = () => (
  <ul>
    {/* eslint-disable-next-line react/no-array-index-key */}
    {items.map((item, index) => <li key={index}>{item}</li>)}
  </ul>
);
