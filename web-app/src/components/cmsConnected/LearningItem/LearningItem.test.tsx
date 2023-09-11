/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { LearningItem } from './LearningItem';

it('matches snapshot', () => {
  const wrapper = shallow(
    <LearningItem
      completed="2018-08-05"
      credentialId="AdMN2oSrbxB6Uv1mNo9hpTeLY9s0"
      // eslint-disable-next-line max-len
      credentialLink="https://www.linkedin.com/learning/certificates/79a9ebf220d4c1dd2ebc94508415949a21614443b37b7e2fc02de3a1a164d420"
      provider={{
        props: {
          title: 'LinkedIn Learning',
          website: 'https://www.linkedin.com/learning/',
        },
        type: 'learningProvider',
      }}
      providerLink="https://www.linkedin.com/learning/learning-web-components"
      render={() => null}
      timeToComplete={84}
      title="Learning Web Components"
    />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot with optional fields', () => {
  const wrapper = shallow(<LearningItem render={() => null} title="Learning Web Components" />);

  expect(wrapper).toMatchSnapshot();
});
