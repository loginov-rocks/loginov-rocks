/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { SocialPresence } from './SocialPresence';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const homeMockData = require('@loginov-rocks/loginov-rocks-shared/src/Home/__fixtures__/homeData.json');

it('matches snapshot', () => {
  const wrapper = shallow(<SocialPresence items={homeMockData.socialPresenceItems} />);

  expect(wrapper).toMatchSnapshot();
});
