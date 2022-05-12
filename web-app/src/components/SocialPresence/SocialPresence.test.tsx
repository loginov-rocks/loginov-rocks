/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import * as homeData from 'data/home.json';

import { SocialPresence } from './SocialPresence';

it('matches snapshot', () => {
  const wrapper = shallow(<SocialPresence items={homeData.socialPresenceItems} />);

  expect(wrapper).toMatchSnapshot();
});
