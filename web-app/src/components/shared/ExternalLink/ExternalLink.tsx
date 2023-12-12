import * as React from 'react';

interface Props {
  children: React.ReactNode;
  href: string;
  label?: string;
}

export const ExternalLink: React.FC<Props> = ({ children, href, label }) => (
  <a href={href} rel="noopener noreferrer" target="_blank" title={label}>{children}</a>
);

ExternalLink.defaultProps = {
  label: undefined,
};
