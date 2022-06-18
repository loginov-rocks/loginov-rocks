/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import * as GitHubContext from 'contexts/GitHubContext';

import { WorksListItem } from './WorksListItem';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const gitHubDataMock = require('@loginov-rocks/loginov-rocks-shared/src/GitHub/__fixtures__/gitHubData.json');

jest.spyOn(GitHubContext, 'useGitHubContext')
  .mockImplementation(() => gitHubDataMock);

it('matches snapshot', () => {
  const wrapper = shallow(<WorksListItem gitHubId="Some work" />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot with GitHub repo', () => {
  const wrapper = shallow(<WorksListItem gitHubId="Angular-Gulp-Boilerplate" />);

  expect(wrapper).toMatchSnapshot();
});
