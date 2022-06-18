import * as React from 'react';

import { CmsEntry } from 'cms/interfaces/CmsEntry';
import { CmsConnectedRepository } from 'cms/lib/CmsConnectedRepository/CmsConnectedRepository';

interface CmsRendererProps {
  cmsEntry: CmsEntry;
}

export const cmsRendererFactory = (cmsConnectedRepository: CmsConnectedRepository): React.FC<CmsRendererProps> => {
  const CmsRenderer: React.FC<CmsRendererProps> = ({ cmsEntry }) => {
    const contentTypeId = cmsEntry.sys.contentType.sys.id;

    if (!contentTypeId) {
      throw new Error('Content type ID missing');
    }

    const component = cmsConnectedRepository.getComponent(contentTypeId);

    if (!component) {
      return null;
    }

    const render = (content: CmsEntry | CmsEntry[]): React.ReactNode | React.ReactNode[] => {
      console.log(content);

      if (Array.isArray(content)) {
        return content.map((child, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <CmsRenderer cmsEntry={child} key={index} />
        ));
      }

      return <CmsRenderer cmsEntry={content} />;
    };

    const props = {
      ...cmsEntry.fields,
      render,
    };

    return React.createElement(component, props);
  };

  return CmsRenderer;
};
