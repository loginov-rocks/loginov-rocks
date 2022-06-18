/* eslint-disable import/no-extraneous-dependencies */

import { BLOCKS } from '@contentful/rich-text-types';
import { shallow } from 'enzyme';
import * as React from 'react';

import { RichTextSection } from './RichTextSection';

it('matches snapshot', () => {
  const wrapper = shallow(
    <RichTextSection
      content={{
        content: [
          {
            content: [
              {
                data: {},
                marks: [],
                nodeType: 'text',
                value: 'I am ',
              },
              {
                data: {},
                marks: [
                  {
                    type: 'bold',
                  },
                ],
                nodeType: 'text',
                value: 'Danila',
              },
              {
                data: {},
                marks: [],
                nodeType: 'text',
                value: ', nice to e-meet you!',
              },
            ],
            data: {},
            nodeType: BLOCKS.PARAGRAPH,
          },
        ],
        data: {},
        nodeType: BLOCKS.DOCUMENT,
      }}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
