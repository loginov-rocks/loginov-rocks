import * as React from 'react';
import { useRouteData } from 'react-static';

import { CmsRenderer } from 'cms/components/CmsRenderer';
import { CmsComponent } from 'cms/interfaces/CmsComponent';

interface RouteData {
  cmsEducationPageComponent: CmsComponent;
}

const EducationPage: React.FC = () => {
  const { cmsEducationPageComponent } = useRouteData<RouteData>();

  return (
    <CmsRenderer cmsComponent={cmsEducationPageComponent} />
  );
};

// Default export is required by React Static.
export default EducationPage;
