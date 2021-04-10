/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import * as data from 'Data.json';

import { App } from './App';

it('matches snapshot', () => {
  const wrapper = shallow(<App data={data} />);

  expect(wrapper).toMatchSnapshot();
});
