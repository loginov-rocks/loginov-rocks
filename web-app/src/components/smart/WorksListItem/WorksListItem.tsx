import * as React from 'react';

import { GitHubWorkDetails } from 'components/dumb/GitHubWorkDetails';
import { Link } from 'components/dumb/Link';
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
    title = <Link href={gitHubRepo.homepageUrl}>{title}</Link>;
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
          <Link href={gitHubRepo.url}>GitHub</Link>
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
