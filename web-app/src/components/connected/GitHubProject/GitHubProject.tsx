import * as React from 'react';

import { WorksListItem } from 'components/smart/WorksListItem';

interface Props {
  gitHubId: string;
}

export const GitHubProject: React.FC<Props> = ({ gitHubId }) => (
  <WorksListItem gitHubId={gitHubId} />
);
