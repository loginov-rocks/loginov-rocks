import { GitHubData } from '@loginov-rocks/loginov-rocks-shared';
import * as React from 'react';
import { useRouteData } from 'react-static';

import { CmsRenderer } from 'cms/components/CmsRenderer';
import { CmsComponent } from 'cms/interfaces/CmsComponent';
import { GitHubContext } from 'contexts/GitHubContext';

interface RouteData {
  cmsHomePageComponent: CmsComponent;
  gitHubData: GitHubData;
}

const IndexPage: React.FC = () => {
  const { cmsHomePageComponent, gitHubData } = useRouteData<RouteData>();

  return (
    <GitHubContext.Provider value={gitHubData}>
      <CmsRenderer cmsComponent={cmsHomePageComponent} />
    </GitHubContext.Provider>
  );
};

// Default export is required by React Static.
export default IndexPage;
