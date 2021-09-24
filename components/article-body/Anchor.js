import React from 'react'

const Anchor = ({ children, href }) => {
  return (
    <a className="text-blue-500 underline cursor-pointer" href={href}>
      {children}
    </a>
  )
}

export default Anchor
