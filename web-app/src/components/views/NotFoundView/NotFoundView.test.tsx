/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { NotFoundView } from './NotFoundView';

it('matches snapshot', () => {
  const wrapper = shallow(<NotFoundView />);

  expect(wrapper).toMatchSnapshot();
});
