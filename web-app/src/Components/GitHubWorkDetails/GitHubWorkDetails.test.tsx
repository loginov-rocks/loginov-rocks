/* eslint-disable import/no-extraneous-dependencies */

import { gitHubMockData } from '@loginov-rocks/loginov-rocks-shared';
import { shallow } from 'enzyme';
import * as React from 'react';

import { GitHubWorkDetails } from './GitHubWorkDetails';

it('matches snapshot', () => {
  const wrapper = shallow(
    <GitHubWorkDetails
      repo={gitHubMockData.repos[0]}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
