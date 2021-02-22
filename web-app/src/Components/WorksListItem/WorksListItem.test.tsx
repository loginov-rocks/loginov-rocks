/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import mockData from 'Lib/GitHub/__fixtures__/data.json';

import { WorksListItem } from './WorksListItem';

it('matches snapshot', () => {
  const wrapper = shallow(<WorksListItem work={{ name: 'Some work' }} />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot with GitHub repo', () => {
  const wrapper = shallow(
    <WorksListItem
      gitHubRepos={mockData.repos}
      work={{ github: true, name: 'Angular-Gulp-Boilerplate' }}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
