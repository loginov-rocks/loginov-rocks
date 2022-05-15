import * as React from 'react';

interface Props {
  href: string;
  children: React.ReactNode;
}

export const Link: React.FunctionComponent<Props> = ({ children, href }) => (
  <a href={href} rel="noopener noreferrer" target="_blank">{children}</a>
);
