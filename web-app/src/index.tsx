/* eslint-disable import/no-import-module-exports */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { App } from 'components/containers/App';

if (typeof document !== 'undefined') {
  const target = document.getElementById('root');

  if (!target) {
    throw new Error('Container missing');
  }

  const renderMethod = target.hasChildNodes()
    ? ReactDOM.hydrate
    : ReactDOM.render;

  const render = (Component: React.FC): void => {
    renderMethod(
      <AppContainer>
        <Component />
      </AppContainer>,
      target,
    );
  };

  render(App);

  // Hot Module Replacement support.
  if (module && module.hot) {
    module.hot.accept('components/containers/App', () => {
      render(App);
    });
  }
}

// Export the top-level component as JSX for static rendering.
export default App;
