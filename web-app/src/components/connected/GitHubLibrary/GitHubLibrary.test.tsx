/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { GitHubLibrary } from './GitHubLibrary';

it('matches snapshot', () => {
  const wrapper = shallow(<GitHubLibrary gitHubId="UbxGps" />);

  expect(wrapper).toMatchSnapshot();
});
