import * as React from 'react';

import { GitHubRepository } from 'components/contextConnected/GitHubRepository';

interface Props {
  gitHubId: string;
}

export const GitHubLibrary: React.FC<Props> = ({ gitHubId }) => (
  <GitHubRepository gitHubId={gitHubId} />
);
