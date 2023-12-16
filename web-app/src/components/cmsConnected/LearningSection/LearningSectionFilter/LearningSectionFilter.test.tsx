/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { LearningSectionFilter } from './LearningSectionFilter';

it('matches snapshot', () => {
  const wrapper = shallow(
    <LearningSectionFilter
      filterProvider={null}
      filterYear={null}
      onSelectProvider={() => undefined}
      onSelectYear={() => undefined}
      providers={[]}
      years={[]}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
