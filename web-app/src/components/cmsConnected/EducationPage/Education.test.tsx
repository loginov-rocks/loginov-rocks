/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { EducationPage } from './EducationPage';

it('matches snapshot', () => {
  const wrapper = shallow(<EducationPage render={() => null} sections={[]} title="Education" />);

  expect(wrapper).toMatchSnapshot();
});
