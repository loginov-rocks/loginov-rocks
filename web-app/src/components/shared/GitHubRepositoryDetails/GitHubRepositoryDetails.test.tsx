/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { GitHubRepositoryDetails } from './GitHubRepositoryDetails';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const gitHubMockData = require('../../../../../shared/src/GitHub/__fixtures__/gitHubData.json');

it('matches snapshot', () => {
  const wrapper = shallow(<GitHubRepositoryDetails repository={gitHubMockData.repos[0]} />);

  expect(wrapper).toMatchSnapshot();
});
