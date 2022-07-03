import * as Contentful from 'contentful';

import { transformToCmsComponent } from './transformToCmsComponent';

export class CmsClient {
  constructor({ accessTokenResolver, spaceResolver }) {
    this.accessTokenResolver = accessTokenResolver;
    this.spaceResolver = spaceResolver;
  }

  async getContentfulClient() {
    if (!this.contentfulClient) {
      const accessToken = await this.accessTokenResolver();
      const space = await this.spaceResolver();

      this.contentfulClient = Contentful.createClient({
        accessToken,
        space,
      });
    }

    return this.contentfulClient;
  }

  async getCmsComponentByType(type) {
    const contentfulClient = await this.getContentfulClient();
    const entries = await contentfulClient.getEntries({
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
