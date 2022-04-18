import React from 'react'
import Pre from '@/components/Pre'

const Code = ({ children }) => {
  return (
    <Pre>
      <code className="bg-black dark:bg-black-light dark:text-gray-400 text-white rounded-md p-3 flex flex-grow">
        {children}
      </code>
    </Pre>
  )
}

export default Code
