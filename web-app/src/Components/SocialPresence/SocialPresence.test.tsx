/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { SocialPresence } from './SocialPresence';

it('matches snapshot', () => {
  const wrapper = shallow(<SocialPresence />);

  expect(wrapper).toMatchSnapshot();
});
