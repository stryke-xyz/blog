import React from 'react';

import Typography from 'components/UI/Typography';

interface ParagraphProps {
  children: React.ReactNode | string;
}

const Paragraph = ({ children }: ParagraphProps) => {
  return (
    <Typography variant="h6" className="text-md sm:text-xl md:text-lg leading-6 py-2">
      {children}
    </Typography>
  );
};

export default Paragraph;
