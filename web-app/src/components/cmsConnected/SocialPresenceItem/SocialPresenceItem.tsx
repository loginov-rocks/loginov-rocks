import * as React from 'react';

import { ExternalLink } from 'components/shared/ExternalLink';
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
        <ExternalLink href={url}>{title}</ExternalLink>
        {' '}
        &mdash; my Toyota Chaser GX71 blog, originally
        {' '}
        <ExternalLink href={secondaryUrl as string}>in Russian</ExternalLink>
      </>
    ) : (
      <ExternalLink href={url}>{title}</ExternalLink>
    )
);

SocialPresenceItem.defaultProps = {
  secondaryUrl: undefined,
};
