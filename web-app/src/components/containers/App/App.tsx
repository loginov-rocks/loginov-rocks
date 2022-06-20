import { Router } from '@reach/router';
import * as React from 'react';
import { addPrefetchExcludes, Root, Routes } from 'react-static';

import DolphPage from 'clientPages/dolph';
import { SplashView } from 'components/views/SplashView';

addPrefetchExcludes([
  'dolph',
]);

export const App: React.FC = () => (
  <Root>
    <React.Suspense fallback={<SplashView />}>
      <Router>
        <DolphPage path="dolph" />
        <Routes path="*" />
      </Router>
    </React.Suspense>
  </Root>
);
