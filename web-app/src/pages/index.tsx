import { GitHubData, HomeData } from '@loginov-rocks/loginov-rocks-shared';
import * as React from 'react';
import { useRouteData } from 'react-static';

import { Home } from 'components/Home';
import { HomePage } from 'contentful/HomePage';

const IndexPage: React.FunctionComponent = () => {
  const {
    gitHubData, homeData, homePage,
  } = useRouteData<{ gitHubData: GitHubData, homeData: HomeData, homePage: HomePage }>();

  return (
    <Home gitHubData={gitHubData} homeData={homeData} homePage={homePage} />
  );
};

export default IndexPage;
