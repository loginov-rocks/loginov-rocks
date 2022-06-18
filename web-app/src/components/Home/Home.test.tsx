/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { Home } from './Home';

it('matches snapshot', () => {
  const wrapper = shallow(
    <Home
      render={() => null}
      sections={[]}
      title="Hello!"
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
