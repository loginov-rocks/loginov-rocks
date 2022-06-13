/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import * as homePageMock from 'contentful/__fixtures__/homePage.json';

import { Home } from './Home';

/* eslint-disable @typescript-eslint/no-var-requires */
const gitHubMockData = require('@loginov-rocks/loginov-rocks-shared/src/GitHub/__fixtures__/gitHubData.json');
const homeMockData = require('@loginov-rocks/loginov-rocks-shared/src/Home/__fixtures__/homeData.json');
/* eslint-enable */

it('matches snapshot', () => {
  // Ignoring TS2322 due to difference between JSON and actual types.
  // @ts-ignore
  const wrapper = shallow(<Home gitHubData={gitHubMockData} homeData={homeMockData} homePage={homePageMock} />);

  expect(wrapper).toMatchSnapshot();
});
