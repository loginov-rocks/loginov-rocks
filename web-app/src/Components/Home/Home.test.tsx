/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import * as homeData from '../../Data/Home.json';

import { Home } from './Home';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const gitHubMockData = require('@loginov-rocks/loginov-rocks-shared/src/GitHub/__fixtures__/data.json');

it('matches snapshot', () => {
  const wrapper = shallow(<Home data={homeData} gitHubData={gitHubMockData} />);

  expect(wrapper).toMatchSnapshot();
});
