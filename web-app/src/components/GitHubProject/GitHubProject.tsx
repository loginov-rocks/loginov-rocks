import * as React from 'react';

interface Props {
  gitHubId: string;
}

export const GitHubProject: React.FC<Props> = ({ gitHubId }) => (
  <strong>{gitHubId}</strong>
);
