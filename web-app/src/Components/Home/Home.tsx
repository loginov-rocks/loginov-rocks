import { GitHubData } from '@loginov-rocks/loginov-rocks-shared';
import * as React from 'react';

import { SocialPresence } from '../SocialPresence';
import { WorksList } from '../WorksList';
import { HomeData } from '../../Data/Interfaces/HomeData';

interface Props {
  gitHubData: GitHubData;
  data: HomeData;
}

export const Home: React.FunctionComponent<Props> = ({ gitHubData, data }) => (
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
        <WorksList gitHubRepos={gitHubData.repos} works={data.openSource.projects} />
      </>
      <>
        <h3>Libraries</h3>
        <WorksList gitHubRepos={gitHubData.repos} works={data.openSource.libraries} />
      </>
    </>
  </>
);
