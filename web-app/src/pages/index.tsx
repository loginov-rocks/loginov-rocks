import { GitHubData, HomeData } from '@loginov-rocks/loginov-rocks-shared';
import * as React from 'react';
import { useRouteData } from 'react-static';

import { Home } from 'components/Home';

const IndexPage: React.FunctionComponent = () => {
  const { gitHubData, homeData } = useRouteData<{ gitHubData: GitHubData, homeData: HomeData }>();

  return (
    <Home gitHubData={gitHubData} homeData={homeData} />
  );
};

export default IndexPage;
