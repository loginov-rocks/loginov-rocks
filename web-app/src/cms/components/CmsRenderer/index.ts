import { cmsConnectedRepository } from 'cms/lib/CmsConnectedRepository';

import { cmsRendererFactory } from './cmsRendererFactory';

const CmsRenderer = cmsRendererFactory(cmsConnectedRepository);

export { CmsRenderer };
