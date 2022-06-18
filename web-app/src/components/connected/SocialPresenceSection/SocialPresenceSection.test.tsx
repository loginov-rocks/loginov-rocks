/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { SocialPresenceSection } from './SocialPresenceSection';

it('matches snapshot', () => {
  const wrapper = shallow(
    <SocialPresenceSection
      items={[]}
      render={() => null}
      title="Social Presence"
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
