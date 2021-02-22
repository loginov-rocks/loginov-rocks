/* eslint-disable import/no-extraneous-dependencies */

import mockData from '@loginov-rocks/loginov-rocks-shared/src/__fixtures__/data.json';
import { shallow } from 'enzyme';
import * as React from 'react';

import { GitHubWorkDetails } from './GitHubWorkDetails';

it('matches snapshot', () => {
  const wrapper = shallow(
    <GitHubWorkDetails
      repo={mockData.repos[0]}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
