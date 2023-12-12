import * as React from 'react';

import { GitHubRepositoryDetails } from 'components/shared/GitHubRepositoryDetails';
import { ExternalLink } from 'components/shared/ExternalLink';
import { useGitHubContext } from 'contexts/GitHubContext';

interface Props {
  gitHubId: string;
}

export const GitHubRepository: React.FC<Props> = ({ gitHubId }) => {
  const gitHubData = useGitHubContext();
  const repository = gitHubData && gitHubData.repos
    ? gitHubData.repos.find((gitHubRepo) => gitHubRepo.name === gitHubId) : undefined;

  let title = <strong>{gitHubId}</strong>;

  if (repository && repository.homepageUrl) {
    title = <ExternalLink href={repository.homepageUrl} label="Link to Project Homepage">{title}</ExternalLink>;
  }

  if (repository && repository.isArchived) {
    title = <s title="Archived">{title}</s>;
  }

  return (
    <>

      {title}

      {repository && (
        <>
          {' '}
          /
          {' '}
          <ExternalLink href={repository.url} label="Link to Repository">GitHub</ExternalLink>
        </>
      )}

      {repository && (
        <>
          <br />
          <GitHubRepositoryDetails repository={repository} />
        </>
      )}

    </>
  );
};
