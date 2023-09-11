/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { LearningSection } from './LearningSection';

it('matches snapshot', () => {
  const wrapper = shallow(<LearningSection blocks={[]} render={() => null} title="Learning" />);

  expect(wrapper).toMatchSnapshot();
});
