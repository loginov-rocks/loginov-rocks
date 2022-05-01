/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import * as homeData from 'Data/Home.json';

import { App } from './App';

it('matches snapshot', () => {
  const wrapper = shallow(<App homeData={homeData} />);

  expect(wrapper).toMatchSnapshot();
});
