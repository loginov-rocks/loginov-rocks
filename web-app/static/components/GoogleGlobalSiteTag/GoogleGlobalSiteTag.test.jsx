import { shallow } from 'enzyme';
import * as React from 'react';

import { GoogleGlobalSiteTag } from './GoogleGlobalSiteTag';

it('matches snapshot', () => {
  const wrapper = shallow(<GoogleGlobalSiteTag trackingId="test-tracking-id" />);

  expect(wrapper).toMatchSnapshot();
});
