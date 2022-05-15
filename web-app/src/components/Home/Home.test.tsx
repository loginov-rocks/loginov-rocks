/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { Home } from './Home';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const gitHubMockData = require('@loginov-rocks/loginov-rocks-shared/src/GitHub/__fixtures__/gitHubData.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const homeMockData = require('@loginov-rocks/loginov-rocks-shared/src/Home/__fixtures__/homeData.json');

it('matches snapshot', () => {
  const wrapper = shallow(<Home gitHubData={gitHubMockData} homeData={homeMockData} />);

  expect(wrapper).toMatchSnapshot();
});
