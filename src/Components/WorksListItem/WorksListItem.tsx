import * as React from 'react';

import GitHubWorkDetails from 'Components/GitHubWorkDetails';
import Link from 'Components/Link';
import Work from 'Interfaces/Work';
import GitHubRepo from 'Lib/GitHub/GitHubRepo';
import { toGitHub, toNpm } from 'Lib/links';

interface Props {
  gitHubRepos?: GitHubRepo[];
  work: Work;
}

const WorksListItem: React.FunctionComponent<Props> = ({ gitHubRepos, work }: Props) => {
  const gitHubRepo = work.github && gitHubRepos ? gitHubRepos.find((repo) => repo.name === work.name) : undefined;

  let title = <strong>{work.name}</strong>;
  if (work.homepage) {
    title = <Link href={work.homepage}>{title}</Link>;
  }
  if (work.archived) {
    title = <s title="Archived">{title}</s>;
  }

  return (
    <li>

      {title}

      {work.github && (
        <>
          {' '}
          /
          {' '}
          <Link href={toGitHub(work.name)}>GitHub</Link>
        </>
      )}

      {work.npm && (
        <>
          {' '}
          /
          {' '}
          <Link href={toNpm(work.name)}>npm</Link>
        </>
      )}

      {work.platformio && (
        <>
          {' '}
          /
          {' '}
          <Link href={work.platformio}>PlatformIO</Link>
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

export default WorksListItem;
