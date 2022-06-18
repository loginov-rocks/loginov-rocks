import * as React from 'react';
import { useRouteData } from 'react-static';

import { CmsRenderer } from 'cms/components/CmsRenderer';
import { CmsEntry } from 'cms/interfaces/CmsEntry';

interface RouteData {
  homePage: CmsEntry;
}

const IndexPage: React.FC = () => {
  const { homePage } = useRouteData<RouteData>();

  return <CmsRenderer cmsEntry={homePage} />;
};

export default IndexPage;
