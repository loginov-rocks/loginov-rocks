import * as React from 'react';

import { CmsConnectedProps } from 'cms/interfaces/CmsConnectedProps';
import { CmsEntry } from 'cms/interfaces/CmsEntry';

interface Props extends CmsConnectedProps {
  items: CmsEntry[];
  title: string;
}

// TODO: Rename to SocialPresenceSection to align with CMS notation.
export const SocialPresence: React.FC<Props> = ({ items, render, title }) => {
  const renderedItems = render(items);

  if (!Array.isArray(renderedItems)) {
    return null;
  }

  return (
    <>
      <h2>{title}</h2>
      <ul>
        {renderedItems.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
