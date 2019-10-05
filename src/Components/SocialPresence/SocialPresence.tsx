import * as React from 'react';

const items = [
  <a href="https://www.linkedin.com/in/loginov-rocks/">LinkedIn</a>,
  <a href="https://github.com/loginov-rocks">GitHub</a>,
  <a href="https://medium.com/@loginov_rocks">Medium</a>,
  <>
    <a href="https://www.drive2.com/r/toyota/chaser/288230376151952785/">DRIVE2</a>
    {' '}
    &mdash; my Toyota Chaser GX71 blog, originally
    {' '}
    <a href="https://www.drive2.ru/r/toyota/chaser/288230376151952785/">in Russian</a>
  </>,
  <a href="https://www.instagram.com/loginov_rocks/">Instagram</a>,
  <a href="https://www.facebook.com/1oginov">Facebook</a>,
  <a href="https://twitter.com/loginov_rocks">Twitter</a>,
  <a href="https://www.npmjs.com/~loginov-rocks">npm</a>,
];

const SocialPresence: React.FunctionComponent = () => (
  <>
    <h2>Social presence</h2>
    <ul>
      {/* eslint-disable-next-line react/no-array-index-key */}
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  </>
);

export default SocialPresence;
