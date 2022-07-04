import * as React from 'react';
import { useSiteData } from 'react-static';

import { CmsRenderer } from 'cms/components/CmsRenderer';
import { CmsComponent } from 'cms/interfaces/CmsComponent';

interface Props {
  path?: string;
}

interface SiteData {
  dolphRouteData: {
    cmsDolphPageComponent: CmsComponent;
  };
}

const DolphPage: React.FC<Props> = () => {
  const { dolphRouteData } = useSiteData<SiteData>();

  return (
    <CmsRenderer cmsComponent={dolphRouteData.cmsDolphPageComponent} />
  );
};

// Default export is used to align with the regular `pages` requirements.
export default DolphPage;
