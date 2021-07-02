/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { PhoneLink } from './PhoneLink';

it('matches snapshot', () => {
  const wrapper = shallow(<PhoneLink first="7 (1" fourth="8-90" second="23) 4" third="56-7" title="Title" />);

  expect(wrapper).toMatchSnapshot();
});
