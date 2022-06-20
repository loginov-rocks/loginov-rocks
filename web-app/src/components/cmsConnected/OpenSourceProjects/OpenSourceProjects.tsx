import * as React from 'react';

import { CmsComponent } from 'cms/interfaces/CmsComponent';
import { CmsConnectedProps } from 'cms/interfaces/CmsConnectedProps';

interface Props extends CmsConnectedProps {
  projects: CmsComponent[];
  title: string;
}

export const OpenSourceProjects: React.FC<Props> = ({ projects, render, title }) => {
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
