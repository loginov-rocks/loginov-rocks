/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import WorksListItem from './WorksListItem';

it('matches snapshot', () => {
  const wrapper = shallow(<WorksListItem work={{ name: 'Some work' }} />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot with GitHub repo', () => {
  const wrapper = shallow(
    <WorksListItem
      gitHubRepos={require('Lib/GitHub/__fixtures__/repos.json')} // eslint-disable-line global-require
      work={{ github: true, name: 'Angular-Gulp-Boilerplate' }}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
