import * as React from 'react';

import { DolphView } from 'components/views/DolphView';

interface Props {
  path?: string;
}

const DolphPage: React.FC<Props> = () => (
  <DolphView />
);

// Default export is used to align with the regular `pages` requirements.
export default DolphPage;
