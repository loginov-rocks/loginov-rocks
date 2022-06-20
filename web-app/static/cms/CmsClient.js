import * as Contentful from 'contentful';

import { transformToCmsComponent } from './transformToCmsComponent';

export class CmsClient {
  constructor({ accessToken, space }) {
    this.contentfulClient = Contentful.createClient({
      accessToken,
      space,
    });
  }

  async getCmsComponentByType(type) {
    const entries = await this.contentfulClient.getEntries({
      content_type: type,
      include: 10,
      limit: 1,
    });

    const entry = entries.items[0];

    if (!entry) {
      throw new Error(`Entry by type ${type} not found`);
    }

    return transformToCmsComponent(entry);
  }
}
