/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { SplashView } from './SplashView';

it('matches snapshot', () => {
  const wrapper = shallow(<SplashView />);

  expect(wrapper).toMatchSnapshot();
});
