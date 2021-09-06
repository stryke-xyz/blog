import React from 'react'
import DynamicComponent from 'components/storyblok/DynamicComponent'

const Grid = ({ blok }) => {
  return (
    <div className="grid">
      {blok.columns.map((blok) => (
        <DynamicComponent blok={blok} key={blok._uid} />
      ))}
    </div>
  )
}

export default Grid
