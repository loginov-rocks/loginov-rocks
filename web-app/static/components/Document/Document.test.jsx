import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import * as React from 'react';

import { Document } from './Document';

const MockComponent = ({ children }) => <div>{children || null}</div>;

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
};

it('matches snapshot', () => {
  const wrapper = shallow(
    <Document Body={MockComponent} Head={MockComponent} Html={MockComponent}>
      <MockComponent>
        Hello, world!
      </MockComponent>
    </Document>,
  );

  expect(wrapper).toMatchSnapshot();
});
