import * as React from 'react';

import { CmsComponent } from 'cms/interfaces/CmsComponent';
import { CmsConnectedProps } from 'cms/interfaces/CmsConnectedProps';

interface Props extends CmsConnectedProps {
  libraries: CmsComponent[];
  title: string;
}

export const OpenSourceLibraries: React.FC<Props> = ({ libraries, render, title }) => {
  const renderedLibraries = render(libraries);

  if (!Array.isArray(renderedLibraries) || renderedLibraries.length === 0) {
    return null;
  }

  return (
    <>
      <h3>{title}</h3>
      <ul>
        {renderedLibraries.map((library, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>{library}</li>
        ))}
      </ul>
    </>
  );
};
