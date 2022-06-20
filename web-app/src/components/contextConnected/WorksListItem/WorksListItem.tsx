import * as React from 'react';

import { GitHubWorkDetails } from 'components/shared/GitHubWorkDetails';
import { ExternalLink } from 'components/shared/ExternalLink';
import { useGitHubContext } from 'contexts/GitHubContext';

interface Props {
  gitHubId: string;
}

export const WorksListItem: React.FC<Props> = ({ gitHubId }) => {
  const gitHubData = useGitHubContext();
  const gitHubRepo = gitHubData && gitHubData.repos
    ? gitHubData.repos.find((repo) => repo.name === gitHubId) : undefined;

  let title = <strong>{gitHubId}</strong>;
  if (gitHubRepo && gitHubRepo.homepageUrl) {
    title = <ExternalLink href={gitHubRepo.homepageUrl}>{title}</ExternalLink>;
  }
  if (gitHubRepo && gitHubRepo.isArchived) {
    title = <s title="Archived">{title}</s>;
  }

  return (
    <>

      {title}

      {gitHubRepo && (
        <>
          {' '}
          /
          {' '}
          <ExternalLink href={gitHubRepo.url}>GitHub</ExternalLink>
        </>
      )}

      {gitHubRepo && (
        <>
          <br />
          <GitHubWorkDetails repo={gitHubRepo} />
        </>
      )}

    </>
  );
};
