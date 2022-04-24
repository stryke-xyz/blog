import React from 'react';

interface OLProps {
  children: React.ReactNode | string;
}

const OL = ({ children }: OLProps) => {
  return <ol className="pl-10 list-decimal py-2">{children}</ol>;
};

export default OL;
