/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import * as data from '../../../plugins/custom-source/data.json';

import { Home } from './Home';

it('matches snapshot', () => {
  const wrapper = shallow(<Home data={data} />);

  expect(wrapper).toMatchSnapshot();
});
