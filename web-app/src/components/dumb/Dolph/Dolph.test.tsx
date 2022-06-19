/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { Dolph } from './Dolph';

it('matches snapshot', () => {
  const wrapper = shallow(<Dolph />);

  expect(wrapper).toMatchSnapshot();
});
