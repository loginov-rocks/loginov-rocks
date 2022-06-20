/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { DolphView } from './DolphView';

it('matches snapshot', () => {
  const wrapper = shallow(<DolphView />);

  expect(wrapper).toMatchSnapshot();
});
