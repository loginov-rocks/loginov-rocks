import * as React from 'react';

import { CmsConnectedProps } from 'cms/interfaces/CmsConnectedProps';
import { CmsEntry } from 'cms/interfaces/CmsEntry';

interface Props extends CmsConnectedProps {
  blocks: CmsEntry[];
  title: string;
}

export const OpenSourceSection: React.FC<Props> = ({ blocks, render, title }) => (
  <>
    <h2>{title}</h2>
    {render(blocks)}
  </>
);
