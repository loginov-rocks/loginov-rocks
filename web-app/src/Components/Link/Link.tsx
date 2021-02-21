import * as React from 'react';

interface Props {
  href: string;
  children: React.ReactNode;
}

const Link: React.FunctionComponent<Props> = ({ children, href }: Props) => (
  <a href={href} rel="noopener noreferrer" target="_blank">{children}</a>
);

export default Link;
