import React from 'react'
import Typography from '@/components/UI/Typography'

const Paragraph = ({ children }) => {
  return (
    <Typography variant="h6" className="text-md sm:text-xl md:text-lg leading-6 py-2">
      {children}
    </Typography>
  )
}

export default Paragraph
