import * as React from 'react';

import { CmsConnectedProps } from 'cms/interfaces/CmsConnectedProps';
import { CmsEntry } from 'cms/interfaces/CmsEntry';

interface Props extends CmsConnectedProps {
  libraries: CmsEntry[];
  title: string;
}

export const OpenSourceLibraries: React.FC<Props> = ({ libraries, render, title }) => {
  const renderedLibraries = render(libraries);

  if (!Array.isArray(renderedLibraries)) {
    return null;
  }

  return (
    <>
      <h3>{title}</h3>
      <ul>
        {renderedLibraries.map((library, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            {library}
          </li>
        ))}
      </ul>
    </>
  );
};
