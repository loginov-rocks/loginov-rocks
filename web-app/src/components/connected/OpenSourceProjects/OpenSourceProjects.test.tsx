/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { OpenSourceProjects } from './OpenSourceProjects';

it('matches snapshot', () => {
  const wrapper = shallow(<OpenSourceProjects projects={[]} render={() => null} title="Projects" />);

  expect(wrapper).toMatchSnapshot();
});
