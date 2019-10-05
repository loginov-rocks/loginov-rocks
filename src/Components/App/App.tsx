import * as React from 'react';

import SocialPresence from 'Components/SocialPresence';
import WorksList from 'Components/WorksList';
import { OPEN_SOURCE_LIBRARIES, OPEN_SOURCE_PROJECTS } from 'Constants';

const App: React.FunctionComponent = () => (
  <>
    <h1>Hi</h1>
    <p>I am Danila, nice to meet you!</p>
    <>
      <h2>Social Presence</h2>
      <SocialPresence />
    </>
    <>
      <h2>Open Source</h2>
      <>
        <h3>Projects</h3>
        <WorksList works={OPEN_SOURCE_PROJECTS} />
      </>
      <>
        <h3>Libraries</h3>
        <WorksList works={OPEN_SOURCE_LIBRARIES} />
      </>
    </>
  </>
);

export default App;
