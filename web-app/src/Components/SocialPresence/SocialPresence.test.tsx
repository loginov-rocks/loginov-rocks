/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import * as data from '../../../plugins/custom-source/data.json';

import { SocialPresence } from './SocialPresence';

it('matches snapshot', () => {
  const wrapper = shallow(<SocialPresence items={data.allSocialPresenceItem.nodes} />);

  expect(wrapper).toMatchSnapshot();
});
