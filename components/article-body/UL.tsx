import React from 'react';

interface ULProps {
  children: React.ReactNode | string;
}

const UL = ({ children }: ULProps) => {
  return <ul className="pl-10 list-disc py-2">{children}</ul>;
};

export default UL;
