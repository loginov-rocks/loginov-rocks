/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { LearningPage } from './LearningPage';

it('matches snapshot', () => {
  const wrapper = shallow(<LearningPage render={() => null} sections={[]} title="Learning" />);

  expect(wrapper).toMatchSnapshot();
});
