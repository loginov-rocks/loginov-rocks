/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { GitHubProject } from './GitHubProject';

it('matches snapshot', () => {
  const wrapper = shallow(
    <GitHubProject
      gitHubId="Web-Bluetooth-Terminal"
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
