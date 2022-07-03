/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import * as GitHubContext from 'contexts/GitHubContext';

import { GitHubRepository } from './GitHubRepository';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const gitHubDataMock = require('../../../../../shared/src/GitHub/__fixtures__/gitHubData.json');

jest.spyOn(GitHubContext, 'useGitHubContext')
  .mockImplementation(() => gitHubDataMock);

it('matches snapshot without GitHub details', () => {
  const wrapper = shallow(<GitHubRepository gitHubId="Some work" />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot with GitHub details', () => {
  const wrapper = shallow(<GitHubRepository gitHubId="Angular-Gulp-Boilerplate" />);

  expect(wrapper).toMatchSnapshot();
});
