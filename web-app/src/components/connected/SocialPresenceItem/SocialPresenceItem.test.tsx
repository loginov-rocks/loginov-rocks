/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { SocialPresenceItem } from './SocialPresenceItem';

it('matches snapshot', () => {
  const wrapper = shallow(<SocialPresenceItem title="LinkedIn" url="https://www.linkedin.com/in/loginov-rocks/" />);

  expect(wrapper).toMatchSnapshot();
});
