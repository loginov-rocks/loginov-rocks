import * as React from 'react';

import { Dolph } from 'components/Dolph';

interface Props {
  path?: string;
}

export const DolphContainer: React.FC<Props> = () => <Dolph />;
