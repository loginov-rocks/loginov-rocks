/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { GitHubWorkDetails } from './GitHubWorkDetails';

it('matches snapshot', () => {
  const wrapper = shallow(
    <GitHubWorkDetails
      // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
      repo={require('Lib/GitHub/__fixtures__/repos.json')[0]}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
