import { Router } from '@reach/router';
import * as React from 'react';
import { addPrefetchExcludes, Root, Routes } from 'react-static';

import { DolphContainer } from 'components/dumb/DolphContainer';
import { Loading } from 'components/dumb/Loading';

addPrefetchExcludes([
  'dolph',
]);

export const App: React.FC = () => (
  <Root>
    <React.Suspense fallback={<Loading />}>
      <Router>
        <DolphContainer path="dolph" />
        <Routes path="*" />
      </Router>
    </React.Suspense>
  </Root>
);
