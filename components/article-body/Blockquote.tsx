import React from 'react'

const Blockquote = ({ children }) => {
  return (
    <blockquote>
      <p className="pl-3 my-4 border-l-4 border-gray-300">{children}</p>
    </blockquote>
  )
}

export default Blockquote
