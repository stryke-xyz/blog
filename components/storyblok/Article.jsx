import React from 'react'

const Article = ({ blok }) => {
  return (
    <div className="space-y-8">
      {/* <h2 className="mb-4 text-white">{blok.title}</h2>
            <p className="px-2 text-gray-300">{blok.summary}</p>
            <div className="text-gray-400">
                <span>{blok.date}</span>
            </div> */}
      {blok.title}
    </div>
  )
}
