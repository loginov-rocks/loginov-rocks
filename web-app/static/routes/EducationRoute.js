export class EducationRoute {
  constructor({ cmsClient, cmsEducationPageComponentType }) {
    this.cmsClient = cmsClient;
    this.cmsEducationPageComponentType = cmsEducationPageComponentType;
  }

  async getData() {
    // Use mocks in non-production environment.
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line global-require
      const cmsEducationPageComponentMock = require('../cms/__fixtures__/cmsEducationPageComponent.json');

      return Promise.resolve({
        cmsEducationPageComponent: cmsEducationPageComponentMock,
      });
    }

    const cmsEducationPageComponent = await this.cmsClient.getCmsComponentByType(this.cmsEducationPageComponentType);

    return { cmsEducationPageComponent };
  }
}
