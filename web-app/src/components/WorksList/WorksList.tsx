import { GitHubRepo } from '@loginov-rocks/loginov-rocks-shared';
import * as React from 'react';

import { WorksListItem } from 'components/WorksListItem';

interface Props {
  gitHubRepos?: GitHubRepo[];
  works: string[];
}

export const WorksList: React.FunctionComponent<Props> = ({ gitHubRepos, works }) => (
  <ul>
    {/* eslint-disable-next-line react/no-array-index-key */}
    {works.map((work, index) => <WorksListItem gitHubRepos={gitHubRepos} key={index} work={work} />)}
  </ul>
);

WorksList.defaultProps = {
  gitHubRepos: [],
};
