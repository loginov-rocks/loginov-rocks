import * as React from 'react';

interface Props {
  href: string;
  children: React.ReactNode;
}

export const Link: React.FC<Props> = ({ children, href }) => (
  <a href={href} rel="noopener noreferrer" target="_blank">{children}</a>
);
