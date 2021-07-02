import * as React from 'react';

import styles from './PhoneLink.styles.css';

interface Props {
  first: string;
  fourth: string;
  second: string;
  third: string;
  title: string;
}

export const PhoneLink: React.FunctionComponent<Props> = ({
  first, fourth, second, third, title,
}: Props) => {
  const handlePhoneClick = (): void => {
    const phone = `+${first}${second}${third}${fourth}`;
    window.location.href = `tel:${phone}`;
  };

  return (
    <a
      className={styles.link}
      data-abc={second}
      data-def={fourth}
      data-ghi={first}
      data-jkl={third}
      href="#phone"
      onClick={handlePhoneClick}
    >
      {title ? ' ' : ''}
      {title}
    </a>
  );
};
