import React from 'react'

const Blockquote = ({ children }) => {
  return (
    <blockquotes>
      <p className="pl-3 m-0 border-l-4 border-gray-300">{children}</p>
    </blockquotes>
  )
}

export default Blockquote
