/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { SocialPresence } from './SocialPresence';

it('matches snapshot', () => {
  const wrapper = shallow(
    <SocialPresence
      items={[]}
      render={() => null}
      title="Social Presence"
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
