import { GitHubData, HomeData } from '@loginov-rocks/loginov-rocks-shared';
import * as React from 'react';

import { SocialPresence } from 'components/SocialPresence';
import { WorksList } from 'components/WorksList';

interface Props {
  gitHubData: GitHubData;
  homeData: HomeData;
}

export const Home: React.FunctionComponent<Props> = ({ gitHubData, homeData }) => (
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
      <SocialPresence items={homeData.socialPresenceItems} />
    </>
    <>
      <h2>Open Source</h2>
      <>
        <h3>Projects</h3>
        <WorksList gitHubRepos={gitHubData.repos} works={homeData.openSource.projects} />
      </>
      <>
        <h3>Libraries</h3>
        <WorksList gitHubRepos={gitHubData.repos} works={homeData.openSource.libraries} />
      </>
    </>
  </>
);
