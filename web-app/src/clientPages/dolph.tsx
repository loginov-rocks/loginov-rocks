import * as React from 'react';

import { DolphView } from 'components/views/DolphView';

interface Props {
  path?: string;
}

const DolphPage: React.FC<Props> = () => (
  <DolphView />
);

export default DolphPage;
