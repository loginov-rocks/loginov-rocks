/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import mockData from 'Lib/GitHub/__fixtures__/data.json';

import { GitHubWorkDetails } from './GitHubWorkDetails';

it('matches snapshot', () => {
  const wrapper = shallow(
    <GitHubWorkDetails
      repo={mockData.repos[0]}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
