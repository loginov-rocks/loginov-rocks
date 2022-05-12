import { GitHubData } from '@loginov-rocks/loginov-rocks-shared';
import * as React from 'react';
import { useRouteData } from 'react-static';

import { Home } from 'components/Home';
import * as homeData from 'data/home.json';

const IndexPage: React.FunctionComponent = () => {
  const { gitHubData } = useRouteData<{ gitHubData: GitHubData }>();

  return (
    <Home data={homeData} gitHubData={gitHubData} />
  );
};

export default IndexPage;
