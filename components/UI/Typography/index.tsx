import { FC } from 'react';
import cx from 'classnames';
import Box, { BoxProps } from '@mui/material/Box';

interface TypographyProps extends BoxProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'caption';
}

const CLASSES = {
  h1: 'font-extrabold uppercase leading-9 tracking-tight text-black dark:text-gray-100 sm:text-3xl sm:leading-10 md:leading-14',
  h2: 'text-3xl font-semibold py-2 dark:text-white text-black',
  h3: 'text-2xl font-semibold py-2 dark:text-white text-black',
  h4: 'text-xl font-semibold dark:text-white text-black',
  h5: 'text-lg dark:text-white text-black',
  h6: 'text-md dark:text-white text-black',
  caption: 'text-xs text-white',
};

const Typography: FC<TypographyProps> = (props) => {
  const { children, variant, component, className, ...otherProps } = props;

  return (
    <Box
      component={component || variant}
      className={cx(CLASSES[variant], className)}
      {...otherProps}
    >
      {children}
    </Box>
  );
};

export default Typography;
