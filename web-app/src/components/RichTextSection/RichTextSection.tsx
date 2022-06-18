import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import * as React from 'react';

interface Props {
  content: Document;
}

export const RichTextSection: React.FC<Props> = ({ content }) => (
  <>
    {documentToReactComponents(content)}
  </>
);
