import * as React from 'react';

import { CmsComponent } from 'cms/interfaces/CmsComponent';
import { CmsConnectedProps } from 'cms/interfaces/CmsConnectedProps';

interface Props extends CmsConnectedProps {
  sections: CmsComponent[];
  title: string;
}

export const HomePage: React.FC<Props> = ({ render, sections, title }) => (
  <>
    <h1>{title}</h1>
    {render(sections)}
  </>
);
