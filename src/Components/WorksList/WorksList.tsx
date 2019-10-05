import * as React from 'react';

import WorksListItem from 'Components/WorksListItem';
import Work from 'Interfaces/Work';

interface Props {
  works: Work[];
}

const WorksList: React.FunctionComponent<Props> = ({ works }: Props) => (
  <ul>
    {/* eslint-disable-next-line react/no-array-index-key */}
    {works.map((work, index) => <WorksListItem key={index} work={work} />)}
  </ul>
);

export default WorksList;
