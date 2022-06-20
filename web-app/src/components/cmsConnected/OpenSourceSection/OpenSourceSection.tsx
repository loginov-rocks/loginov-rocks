import * as React from 'react';

import { CmsComponent } from 'cms/interfaces/CmsComponent';
import { CmsConnectedProps } from 'cms/interfaces/CmsConnectedProps';

interface Props extends CmsConnectedProps {
  blocks: CmsComponent[];
  title: string;
}

export const OpenSourceSection: React.FC<Props> = ({ blocks, render, title }) => (
  <>
    <h2>{title}</h2>
    {render(blocks)}
  </>
);
