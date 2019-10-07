import * as React from 'react';

import Work from 'Interfaces/Work';
import GitHubRepo from 'Lib/GitHub/GitHubRepo';
import { toGitHub, toNpm } from 'Lib/links';

interface Props {
  gitHubRepos?: GitHubRepo[];
  work: Work;
}

const WorksListItem: React.FunctionComponent<Props> = ({ gitHubRepos, work }: Props) => {
  const gitHubRepo = work.github && gitHubRepos ? gitHubRepos.find((repo) => repo.name === work.name) : undefined;

  return (
    <li>

      {work.archived ? <s>{work.name}</s> : work.name}

      {work.github && (
        <>
          {' '}
          <a href={toGitHub(work.name)}>GitHub</a>
        </>
      )}

      {work.npm && (
        <>
          {' '}
          <a href={toNpm(work.name)}>npm</a>
        </>
      )}

      {gitHubRepo && (
        <>
          <br />
          <strong>{gitHubRepo.language}</strong>
          {gitHubRepo.stargazers_count > 0 && (
            <>
              {' '}
              &#x2B50;
              {gitHubRepo.stargazers_count}
            </>
          )}
          {' '}
          {gitHubRepo.description}
        </>
      )}

    </li>
  );
};

export default WorksListItem;
