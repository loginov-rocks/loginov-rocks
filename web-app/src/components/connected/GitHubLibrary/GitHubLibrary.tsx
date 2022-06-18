import * as React from 'react';

interface Props {
  gitHubId: string;
}

export const GitHubLibrary: React.FC<Props> = ({ gitHubId }) => (
  <strong>{gitHubId}</strong>
);
