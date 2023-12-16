import * as React from 'react';
import { useEffect } from 'react';

import { ExternalLink } from 'components/shared/ExternalLink';
import { useLearningSectionContext } from 'contexts/LearningSectionContext';

interface Props {
  title: string;
  website?: string;
}

export const LearningProvider: React.FC<Props> = ({ title, website }) => {
  const { addProvider } = useLearningSectionContext();

  useEffect(() => {
    addProvider(title);
  }, []);

  if (website) {
    return <ExternalLink href={website} label="Link to Provider">{title}</ExternalLink>;
  }

  return <span title="Provider">{title}</span>;
};

LearningProvider.defaultProps = {
  website: undefined,
};
