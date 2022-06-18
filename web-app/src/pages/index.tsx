import { GitHubData } from '@loginov-rocks/loginov-rocks-shared';
import * as React from 'react';
import { useRouteData } from 'react-static';

import { CmsRenderer } from 'cms/components/CmsRenderer';
import { CmsEntry } from 'cms/interfaces/CmsEntry';
import { GitHubContext } from 'contexts/GitHubContext';

interface RouteData {
  gitHubData: GitHubData;
  homePage: CmsEntry;
}

const IndexPage: React.FC = () => {
  const { gitHubData, homePage } = useRouteData<RouteData>();

  return (
    <GitHubContext.Provider value={gitHubData}>
      <CmsRenderer cmsEntry={homePage} />
    </GitHubContext.Provider>
  );
};

export default IndexPage;
