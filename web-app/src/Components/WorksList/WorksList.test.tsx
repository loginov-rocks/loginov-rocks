/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import WorksList from './WorksList';

it('matches snapshot', () => {
  const wrapper = shallow(<WorksList works={[{ name: 'Some work' }]} />);

  expect(wrapper).toMatchSnapshot();
});
