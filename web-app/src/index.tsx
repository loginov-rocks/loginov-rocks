import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { App } from './Components/App';

if (typeof document !== 'undefined') {
  const target = document.getElementById('root');

  const renderMethod = target.hasChildNodes()
    ? ReactDOM.hydrate
    : ReactDOM.render;

  const render = (Component: Function) => {
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
    module.hot.accept('./Components/App', () => {
      render(App);
    });
  }
}

// Export the top-level component as JSX for static rendering.
export default App;
