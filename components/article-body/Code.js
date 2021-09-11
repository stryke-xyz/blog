import React from 'react'
import Pre from '@/components/Pre'

const Code = ({ children }) => {
  return (
    <Pre>
      <code className="bg-black text-white rounded-md p-3 flex flex-grow">{children}</code>
    </Pre>
  )
}

export default Code
