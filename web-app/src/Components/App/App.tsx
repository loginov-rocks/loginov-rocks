import { GitHubData } from '@loginov-rocks/loginov-rocks-shared';
import * as React from 'react';

import { SocialPresence } from 'Components/SocialPresence';
import { WorksList } from 'Components/WorksList';
import { WEB_APP_S3_GITHUB_FILE_KEY } from 'Constants';
import { Data } from 'Lib/Data';
import { GitHubData as GetGitHubData } from 'Lib/GitHubData';

const getGitHubData = new GetGitHubData({ url: `/${WEB_APP_S3_GITHUB_FILE_KEY}` });

interface Props {
  data: Data;
}

export const App: React.FunctionComponent<Props> = ({ data }: Props) => {
  const [gitHubData, setGitHubData] = React.useState<GitHubData | null>(null);

  React.useEffect(() => {
    getGitHubData.get()
      .then((_gitHubData) => {
        setGitHubData(_gitHubData);
      });
  }, []);

  return (
    <>
      <h1>Hi</h1>
      <p>I am Danila, nice to meet you!</p>
      <>
        <h2>Social Presence</h2>
        <SocialPresence items={data.socialPresenceItems} />
      </>
      <>
        <h2>Open Source</h2>
        <>
          <h3>Projects</h3>
          <WorksList gitHubRepos={gitHubData ? gitHubData.repos : []} works={data.openSource.projects} />
        </>
        <>
          <h3>Libraries</h3>
          <WorksList gitHubRepos={gitHubData ? gitHubData.repos : []} works={data.openSource.libraries} />
        </>
      </>
    </>
  );
};
