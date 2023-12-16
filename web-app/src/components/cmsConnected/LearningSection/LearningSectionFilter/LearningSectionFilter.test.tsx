/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { LearningSectionFilter } from './LearningSectionFilter';

it('matches snapshot', () => {
  const wrapper = shallow(
    <LearningSectionFilter filterYear={null} onSelectYear={() => undefined} years={['2021', '2022', '2023']} />,
  );

  expect(wrapper).toMatchSnapshot();
});
