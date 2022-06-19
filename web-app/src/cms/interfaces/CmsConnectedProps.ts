import { ReactNode } from 'react';

import { CmsEntry } from 'cms/interfaces/CmsEntry';

export interface CmsConnectedProps {
  render: (content: CmsEntry | CmsEntry[]) => ReactNode | ReactNode[];
}
