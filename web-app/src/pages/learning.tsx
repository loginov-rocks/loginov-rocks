import * as React from 'react';
import { useRouteData } from 'react-static';

import { CmsRenderer } from 'cms/components/CmsRenderer';
import { CmsComponent } from 'cms/interfaces/CmsComponent';

interface RouteData {
  cmsLearningPageComponent: CmsComponent;
}

const LearningPage: React.FC = () => {
  const { cmsLearningPageComponent } = useRouteData<RouteData>();

  return (
    <CmsRenderer cmsComponent={cmsLearningPageComponent} />
  );
};

// Default export is required by React Static.
export default LearningPage;
