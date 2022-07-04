// Implements the same interface as HomeRoute but used differently since no static route exists for this page.
// @see https://github.com/react-static/react-static/issues/1667
export class DolphRoute {
  constructor({ cmsClient, cmsDolphPageComponentType }) {
    this.cmsClient = cmsClient;
    this.cmsDolphPageComponentType = cmsDolphPageComponentType;
  }

  async getData() {
    // Use mocks in non-production environment.
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line global-require
      const cmsDolphPageComponentMock = require('../cms/__fixtures__/cmsDolphPageComponent.json');

      return Promise.resolve({
        cmsDolphPageComponent: cmsDolphPageComponentMock,
      });
    }

    const cmsDolphPageComponent = await this.cmsClient.getCmsComponentByType(this.cmsDolphPageComponentType);

    return { cmsDolphPageComponent };
  }
}
