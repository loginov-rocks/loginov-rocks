import { GitHubData } from '@loginov-rocks/loginov-rocks-shared';
import * as React from 'react';
import { useRouteData } from 'react-static';

import { Home } from 'Components/Home';
import * as homeData from 'Data/Home.json';

export default () => {
  const { gitHubData } = useRouteData<{ gitHubData: GitHubData }>();

  return (
    <Home data={homeData} gitHubData={gitHubData} />
  );
}
