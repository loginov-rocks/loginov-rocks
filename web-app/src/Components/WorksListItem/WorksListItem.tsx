import { GitHubRepo } from '@loginov-rocks/loginov-rocks-shared';
import * as React from 'react';

import { GitHubWorkDetails } from 'Components/GitHubWorkDetails';
import { Link } from 'Components/Link';

interface Props {
  gitHubRepos?: GitHubRepo[];
  work: string;
}

export const WorksListItem: React.FunctionComponent<Props> = ({ gitHubRepos, work }) => {
  const gitHubRepo = gitHubRepos ? gitHubRepos.find((repo) => repo.name === work) : undefined;

  let title = <strong>{work}</strong>;
  if (gitHubRepo && gitHubRepo.homepageUrl) {
    title = <Link href={gitHubRepo.homepageUrl}>{title}</Link>;
  }
  if (gitHubRepo && gitHubRepo.isArchived) {
    title = <s title="Archived">{title}</s>;
  }

  return (
    <li>

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

    </li>
  );
};

WorksListItem.defaultProps = {
  gitHubRepos: [],
};
