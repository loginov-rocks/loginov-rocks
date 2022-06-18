import * as React from 'react';

import { CmsConnectedProps } from 'cms/interfaces/CmsConnectedProps';
import { CmsEntry } from 'cms/interfaces/CmsEntry';

interface Props extends CmsConnectedProps {
  projects: CmsEntry[];
  title: string;
}

// TODO: Rename to OpenSourceProjects to align with CMS notation.
export const WorksList: React.FC<Props> = ({ projects, render, title }) => {
  const renderedProjects = render(projects);

  if (!Array.isArray(renderedProjects)) {
    return null;
  }

  return (
    <>
      <h3>{title}</h3>
      <ul>
        {renderedProjects.map((project, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            {project}
          </li>
        ))}
      </ul>
    </>
  );
};
