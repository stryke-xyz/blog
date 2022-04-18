import React from 'react'

interface AnchorProps {
  children?: string
  href?: string
}
const Anchor = ({ children, href }: AnchorProps) => {
  return (
    <a className="text-blue-500 underline cursor-pointer break-all" href={href}>
      {children}
    </a>
  )
}

export default Anchor
