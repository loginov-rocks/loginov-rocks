/* eslint-disable import/no-extraneous-dependencies */

import { shallow } from 'enzyme';
import * as React from 'react';

import { Time } from './Time';

it('matches snapshot when 0 minutes passed', () => {
  const wrapper = shallow(<Time label="Time to Complete" minutes={0} />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot when 1 minute passed', () => {
  const wrapper = shallow(<Time label="Time to Complete" minutes={1} />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot when 12 minutes passed', () => {
  const wrapper = shallow(<Time label="Time to Complete" minutes={12} />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot when 60 minutes passed', () => {
  const wrapper = shallow(<Time label="Time to Complete" minutes={60} />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot when 120 minutes passed', () => {
  const wrapper = shallow(<Time label="Time to Complete" minutes={120} />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot when 121 minutes passed', () => {
  const wrapper = shallow(<Time label="Time to Complete" minutes={121} />);

  expect(wrapper).toMatchSnapshot();
});

it('matches snapshot when 123 minutes passed', () => {
  const wrapper = shallow(<Time label="Time to Complete" minutes={123} />);

  expect(wrapper).toMatchSnapshot();
});
