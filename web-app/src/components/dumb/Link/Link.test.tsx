/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { Link } from './Link';

it('matches snapshot', () => {
  const wrapper = shallow(<Link href="https://example.com">Title</Link>);

  expect(wrapper).toMatchSnapshot();
});
