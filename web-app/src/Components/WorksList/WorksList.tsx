import { GitHubRepo } from '@loginov-rocks/loginov-rocks-shared';
import * as React from 'react';

import { WorksListItem } from 'Components/WorksListItem';
import { Work } from 'Interfaces/Work';

interface Props {
  gitHubRepos?: GitHubRepo[];
  works: Work[];
}

export const WorksList: React.FunctionComponent<Props> = ({ gitHubRepos, works }: Props) => (
  <ul>
    {/* eslint-disable-next-line react/no-array-index-key */}
    {works.map((work, index) => <WorksListItem gitHubRepos={gitHubRepos} key={index} work={work} />)}
  </ul>
);

WorksList.defaultProps = {
  gitHubRepos: [],
};
