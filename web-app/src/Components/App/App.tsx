import { Link, Router } from '@reach/router';
import * as React from 'react';
import { addPrefetchExcludes, Root, Routes } from 'react-static';

import { DolphContainer } from 'containers/DolphContainer';

addPrefetchExcludes([
  'dolph',
]);

export const App: React.FunctionComponent = () => (
  <Root>
    {/* TODO: Remove */}
    <nav>
      <Link to="/">Home</Link>
      <Link to="/dolph">Dolph</Link>
    </nav>
    {/* TODO: Refactor */}
    <React.Suspense fallback={<em>Loading...</em>}>
      <Router>
        <DolphContainer path="dolph" />
        <Routes path="*" />
      </Router>
    </React.Suspense>
  </Root>
);

export default App;
