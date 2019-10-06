import * as React from 'react';

import Work from 'Interfaces/Work';
import GitHubRepo from 'Lib/GitHub/GitHubRepo';
import { toGitHub, toNpm } from 'Lib/links';

interface Props {
  gitHubRepos?: GitHubRepo[];
  work: Work;
}

const WorksListItem: React.FunctionComponent<Props> = ({ work }: Props) => (
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

  </li>
);

export default WorksListItem;
