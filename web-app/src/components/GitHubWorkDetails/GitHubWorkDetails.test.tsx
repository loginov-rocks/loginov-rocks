/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { GitHubWorkDetails } from './GitHubWorkDetails';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const gitHubMockData = require('@loginov-rocks/loginov-rocks-shared/src/GitHub/__fixtures__/data.json');

it('matches snapshot', () => {
  const wrapper = shallow(
    <GitHubWorkDetails
      repo={gitHubMockData.repos[0]}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
