/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { OpenSourceLibraries } from './OpenSourceLibraries';

it('matches snapshot', () => {
  const wrapper = shallow(<OpenSourceLibraries libraries={[]} render={() => null} title="Libraries" />);

  expect(wrapper).toMatchSnapshot();
});
