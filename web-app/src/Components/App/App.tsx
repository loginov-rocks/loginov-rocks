import { GitHubData as Data } from '@loginov-rocks/loginov-rocks-shared';
import * as React from 'react';

import { SocialPresence } from 'Components/SocialPresence';
import { WorksList } from 'Components/WorksList';
import { OPEN_SOURCE_LIBRARIES, OPEN_SOURCE_PROJECTS, WEB_APP_S3_GITHUB_FILE_KEY } from 'Constants';
import { GitHubData } from 'Lib/GitHubData';

const gitHubData = new GitHubData({ url: `/${WEB_APP_S3_GITHUB_FILE_KEY}` });

export const App: React.FunctionComponent = () => {
  const [data, setData] = React.useState<Data | null>(null);

  React.useEffect(() => {
    gitHubData.get()
      .then((_data) => {
        setData(_data);
      });
  }, []);

  return (
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
          <WorksList gitHubRepos={data ? data.repos : []} works={OPEN_SOURCE_PROJECTS} />
        </>
        <>
          <h3>Libraries</h3>
          <WorksList gitHubRepos={data ? data.repos : []} works={OPEN_SOURCE_LIBRARIES} />
        </>
      </>
    </>
  );
};
