import React from 'react'

const Anchor = ({ children, href }) => {
  return (
    <a className="text-blue-500 underline cursor-pointer break-all" href={href}>
      {children}
    </a>
  )
}

export default Anchor
