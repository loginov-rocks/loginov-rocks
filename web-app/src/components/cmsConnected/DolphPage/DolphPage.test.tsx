/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { DolphPage } from './DolphPage';

it('matches snapshot', () => {
  const wrapper = shallow(<DolphPage render={() => null} sections={[]} title="Hello!" />);

  expect(wrapper).toMatchSnapshot();
});
