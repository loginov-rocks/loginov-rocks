import * as React from 'react';

import { Link } from 'components/dumb/Link';
import { SOCIAL_PRESENCE_DRIVE2_TITLE } from 'Constants';

interface Props {
  secondaryUrl?: string;
  title: string;
  url: string;
}

export const SocialPresenceItem: React.FC<Props> = ({ secondaryUrl, title, url }) => (
  title === SOCIAL_PRESENCE_DRIVE2_TITLE
    ? (
      <>
        <Link href={url}>{title}</Link>
        {' '}
        &mdash; my Toyota Chaser GX71 blog, originally
        {' '}
        <Link href={secondaryUrl as string}>in Russian</Link>
      </>
    ) : (
      <Link href={url}>{title}</Link>
    )
);

SocialPresenceItem.defaultProps = {
  secondaryUrl: undefined,
};
