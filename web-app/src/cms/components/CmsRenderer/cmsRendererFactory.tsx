import * as React from 'react';

import { CmsComponent } from 'cms/interfaces/CmsComponent';
import { CmsConnectedRepository } from 'cms/lib/CmsConnectedRepository/CmsConnectedRepository';

interface CmsRendererProps {
  cmsComponent: CmsComponent;
}

export const cmsRendererFactory = (cmsConnectedRepository: CmsConnectedRepository): React.FC<CmsRendererProps> => {
  const CmsRenderer: React.FC<CmsRendererProps> = ({ cmsComponent }) => {
    const component = cmsConnectedRepository.getComponent(cmsComponent.type);

    if (!component) {
      return null;
    }

    const render = (content: CmsComponent | CmsComponent[]): React.ReactNode | React.ReactNode[] => {
      if (Array.isArray(content)) {
        return content.map((child, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <CmsRenderer cmsComponent={child} key={index} />
        ));
      }

      return <CmsRenderer cmsComponent={content} />;
    };

    const props = {
      ...cmsComponent.props,
      render,
    };

    return React.createElement(component, props);
  };

  return CmsRenderer;
};
