import React from 'react';

interface LIProps {
  children: React.ReactNode | string;
}

const LI = ({ children }: LIProps) => {
  return <li className="py-1 xs:text-md lg:text-lg leading-6">{children}</li>;
};

export default LI;
