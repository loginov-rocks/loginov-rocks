import { transformToCmsComponent } from './transformToCmsComponent';

import cmsHomePageComponentMock from './__fixtures__/cmsHomePageComponent.json';
import homePageEntriesMock from './__fixtures__/homePageEntries.json';

it('transforms Contentful entry to CMS component', () => {
  const cmsComponent = transformToCmsComponent(homePageEntriesMock.items[0]);

  expect(cmsComponent).toStrictEqual(cmsHomePageComponentMock);
});
