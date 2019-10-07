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

  let title = <strong>{work.name}</strong>;
  if (work.homepage) {
    title = <a href={work.homepage}>{title}</a>;
  }
  if (work.archived) {
    title = <s>{title}</s>;
  }

  return (
    <li>

      {title}

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

          {gitHubRepo.description && (
            <>
              <br />
              {gitHubRepo.description}
            </>
          )}

          {(gitHubRepo.language || gitHubRepo.stargazers_count > 0) && (
            <>
              <br />
              {gitHubRepo.language}
              {gitHubRepo.stargazers_count > 0 && (
                <>
                  {' '}
                  &#x2B50;
                  {gitHubRepo.stargazers_count}
                </>
              )}
            </>
          )}

        </>
      )}

    </li>
  );
};

export default WorksListItem;
