/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { WorksListItem } from './WorksListItem';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const gitHubMockData = require('@loginov-rocks/loginov-rocks-shared/src/GitHub/__fixtures__/gitHubData.json');

it('matches snapshot', () => {
  const wrapper = shallow(<WorksListItem work="Some work" />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot with GitHub repo', () => {
  const wrapper = shallow(
    <WorksListItem
      gitHubRepos={gitHubMockData.repos}
      work="Angular-Gulp-Boilerplate"
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
