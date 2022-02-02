import React from 'react'

const CustomImage = ({ src, alt }) => {
  return <img src={src} alt={alt || 'custom'} className="mx-auto" />
}

export default CustomImage
