export class LearningRoute {
  constructor({ cmsClient, cmsLearningPageComponentType }) {
    this.cmsClient = cmsClient;
    this.cmsLearningPageComponentType = cmsLearningPageComponentType;
  }

  async getData() {
    // Use mocks in non-production environment.
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line global-require
      const cmsLearningPageComponentMock = require('../cms/__fixtures__/cmsLearningPageComponent.json');

      return Promise.resolve({
        cmsLearningPageComponent: cmsLearningPageComponentMock,
      });
    }

    const cmsLearningPageComponent = await this.cmsClient.getCmsComponentByType(this.cmsLearningPageComponentType);

    return { cmsLearningPageComponent };
  }
}
