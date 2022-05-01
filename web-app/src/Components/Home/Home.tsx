import { GitHubData } from '@loginov-rocks/loginov-rocks-shared';
import * as React from 'react';

import { SocialPresence } from 'Components/SocialPresence';
import { WorksList } from 'Components/WorksList';
import { WEB_APP_S3_GITHUB_FILE_KEY } from 'Constants';
import { HomeData } from 'Data/Interfaces/HomeData';
import { GitHubData as GetGitHubData } from 'Lib/GitHubData';

const getGitHubData = new GetGitHubData({ url: `/${WEB_APP_S3_GITHUB_FILE_KEY}` });

interface Props {
  data: HomeData;
}

export const Home: React.FunctionComponent<Props> = ({ data }) => {
  const [gitHubData, setGitHubData] = React.useState<GitHubData | null>(null);

  React.useEffect(() => {
    getGitHubData.get()
      .then((_gitHubData) => {
        setGitHubData(_gitHubData);
      });
  }, []);

  return (
    <>
      <h1>Hello!</h1>
      <p>
        I am
        {' '}
        <strong>Danila</strong>
        , nice to e-meet you!
      </p>
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
