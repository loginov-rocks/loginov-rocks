import * as React from 'react';

import { ExternalLink } from 'components/shared/ExternalLink';

interface Props {
  title: string;
  website?: string;
}

export const LearningProvider: React.FC<Props> = ({ title, website }) => (
  website
    ? (<ExternalLink href={website} label="Link to Provider">{title}</ExternalLink>)
    : (<span title="Provider">{title}</span>)
);

LearningProvider.defaultProps = {
  website: undefined,
};
