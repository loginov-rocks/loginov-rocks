/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { LearningProvider } from './LearningProvider';

it('matches snapshot', () => {
  const wrapper = shallow(<LearningProvider title="LinkedIn Learning" website="https://www.linkedin.com/learning/" />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot with optional fields', () => {
  const wrapper = shallow(<LearningProvider title="LinkedIn Learning" />);

  expect(wrapper).toMatchSnapshot();
});
