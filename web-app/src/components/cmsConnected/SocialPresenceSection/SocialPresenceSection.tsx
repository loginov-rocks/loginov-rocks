import * as React from 'react';

import { CmsComponent } from 'cms/interfaces/CmsComponent';
import { CmsConnectedProps } from 'cms/interfaces/CmsConnectedProps';

interface Props extends CmsConnectedProps {
  items: CmsComponent[];
  title: string;
}

export const SocialPresenceSection: React.FC<Props> = ({ items, render, title }) => {
  const renderedItems = render(items);

  if (!Array.isArray(renderedItems) || renderedItems.length === 0) {
    return null;
  }

  return (
    <>
      <h2>{title}</h2>
      <ul>
        {renderedItems.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
};
