/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import * as homeData from 'Data/Home.json';

import { Home } from './Home';

it('matches snapshot', () => {
  const wrapper = shallow(<Home data={homeData} />);

  expect(wrapper).toMatchSnapshot();
});
