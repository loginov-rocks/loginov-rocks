import * as React from 'react';

import { Dolph } from 'components/dumb/Dolph';

interface Props {
  path?: string;
}

export const DolphContainer: React.FC<Props> = () => <Dolph />;
