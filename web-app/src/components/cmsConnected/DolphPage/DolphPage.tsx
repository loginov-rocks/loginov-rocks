import * as React from 'react';

import { CmsConnectedProps } from 'cms/interfaces/CmsConnectedProps';
import { CmsComponent } from 'cms/interfaces/CmsComponent';

interface Props extends CmsConnectedProps {
  sections: CmsComponent[];
  title: string;
}

export const DolphPage: React.FC<Props> = ({ render, sections, title }) => (
  <>
    <h1>{title}</h1>
    {render(sections)}
  </>
);
