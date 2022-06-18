import * as React from 'react';

import { CmsConnectedProps } from 'cms/interfaces/CmsConnectedProps';
import { CmsEntry } from 'cms/interfaces/CmsEntry';

interface Props extends CmsConnectedProps {
  sections: CmsEntry[];
  title: string;
}

export const Home: React.FC<Props> = ({ render, sections, title }) => (
  <>
    <h1>{title}</h1>
    {render(sections)}
  </>
);
