import React from 'react';

import Pre from '@/components/Pre';

interface CodeProps {
  children: any | React.ReactNode;
}

const Code = ({ children }: CodeProps) => {
  return (
    <Pre>
      <code className="bg-black dark:bg-black-light dark:text-gray-400 text-white rounded-md p-3 flex flex-grow">
        {children}
      </code>
    </Pre>
  );
};

export default Code;
