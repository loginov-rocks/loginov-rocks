/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { LearningBlock } from './LearningBlock';

it('matches snapshot', () => {
  const wrapper = shallow(<LearningBlock items={[]} render={() => null} title="Technologies" />);

  expect(wrapper).toMatchSnapshot();
});
