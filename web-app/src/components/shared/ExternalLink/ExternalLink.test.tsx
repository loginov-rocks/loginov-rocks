/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { ExternalLink } from './ExternalLink';

it('matches snapshot', () => {
  const wrapper = shallow(<ExternalLink href="https://example.com">Title</ExternalLink>);

  expect(wrapper).toMatchSnapshot();
});
