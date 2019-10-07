/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import GitHubWorkDetails from './GitHubWorkDetails';

it('matches snapshot', () => {
  const wrapper = shallow(
    <GitHubWorkDetails
      repo={require('Lib/GitHub/__fixtures__/repos.json')[0]} // eslint-disable-line global-require
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
