import React from 'react';

import Typography from 'components/UI/Typography';

interface HeaderProps {
  children?: React.ReactNode & React.ReactNode[];
  variant?: 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const H1 = (props: HeaderProps) => {
  const { children, variant = 'h1' } = props;

  return <Typography variant={variant}>{children}</Typography>;
};
const H2 = (props: HeaderProps) => {
  const { children, variant = 'h2' } = props;

  return <Typography variant={variant}>{children}</Typography>;
};
const H3 = (props: HeaderProps) => {
  const { children, variant = 'h3' } = props;

  return <Typography variant={variant}>{children}</Typography>;
};
const H4 = (props: HeaderProps) => {
  const { children, variant = 'h4' } = props;

  return <Typography variant={variant}>{children}</Typography>;
};
const H5 = (props: HeaderProps) => {
  const { children, variant = 'h5' } = props;

  return <Typography variant={variant}>{children}</Typography>;
};

const H6 = (props: HeaderProps) => {
  const { children, variant = 'h6' } = props;

  return <Typography variant={variant}>{children}</Typography>;
};

export { H1, H2, H3, H4, H5, H6 };
