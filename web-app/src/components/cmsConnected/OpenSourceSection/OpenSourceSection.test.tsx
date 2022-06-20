/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { OpenSourceSection } from './OpenSourceSection';

it('matches snapshot', () => {
  const wrapper = shallow(<OpenSourceSection blocks={[]} render={() => null} title="Open Source" />);

  expect(wrapper).toMatchSnapshot();
});
