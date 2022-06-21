import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {
  Block, Document, Inline, INLINES,
} from '@contentful/rich-text-types';
import * as React from 'react';

import { ExternalLink } from 'components/shared/ExternalLink';
import { PhoneLink } from 'components/shared/PhoneLink';

interface Props {
  content: Document;
}

// Configure Contentful Rich Text Renderer to support available inline components.
const options = {
  renderNode: {
    [INLINES.EMBEDDED_ENTRY]: (node: Block | Inline) => {
      /* eslint-disable react/destructuring-assignment */
      const type = node.data.target.sys.contentType.sys.id;
      const props = node.data.target.fields;
      /* eslint-enable */

      if (type === 'inlineExternalLink') {
        return (
          /* eslint-disable react/prop-types */
          <ExternalLink href={props.href}>{props.title}</ExternalLink>
          /* eslint-enable */
        );
      }

      if (type === 'inlinePhoneLink') {
        return (
          /* eslint-disable react/prop-types */
          <PhoneLink
            title={props.title}
            first={props.first}
            second={props.second}
            third={props.third}
            fourth={props.fourth}
          />
          /* eslint-enable */
        );
      }

      return null;
    },
  },
};

export const RichTextSection: React.FC<Props> = ({ content }) => (
  <>
    {documentToReactComponents(content, options)}
  </>
);
