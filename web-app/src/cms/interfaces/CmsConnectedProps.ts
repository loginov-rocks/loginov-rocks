import { ReactNode } from 'react';

import { CmsComponent } from 'cms/interfaces/CmsComponent';

export interface CmsConnectedProps {
  render: (content: CmsComponent | CmsComponent[]) => ReactNode | ReactNode[];
}
