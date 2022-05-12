/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { NotFound } from './NotFound';

it('matches snapshot', () => {
  const wrapper = shallow(<NotFound />);

  expect(wrapper).toMatchSnapshot();
});
