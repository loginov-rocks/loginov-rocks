/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import data from 'Data.json';

import { SocialPresence } from './SocialPresence';

it('matches snapshot', () => {
  const wrapper = shallow(<SocialPresence items={data.socialPresenceItems} />);

  expect(wrapper).toMatchSnapshot();
});
