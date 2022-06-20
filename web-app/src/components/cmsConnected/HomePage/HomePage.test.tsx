/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { HomePage } from './HomePage';

it('matches snapshot', () => {
  const wrapper = shallow(<HomePage render={() => null} sections={[]} title="Hello!" />);

  expect(wrapper).toMatchSnapshot();
});
