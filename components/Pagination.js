import { useContext } from 'react'

import { LocalizationContext } from 'contexts/Localization'
import siteMetadata from '@/data/siteMetadata'

export default function Pagination({ totalPages, currentPage, handleNextPage, handlePrevPage }) {
  const { selectedLanguage } = useContext(LocalizationContext)
  const prevPage = parseInt(currentPage) - 1 > 0
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)

  return (
    <div className="pt-6 pb-8 space-y-2 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button rel="previous" className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            {siteMetadata.pagination.previous[selectedLanguage]}
          </button>
        )}
        {prevPage && (
          <button rel="previous" onClick={() => handlePrevPage(prevPage)}>
            {siteMetadata.pagination.previous[selectedLanguage]}
          </button>
        )}
        <span>
          {currentPage} / {totalPages}
        </span>
        {!nextPage && (
          <button rel="next" className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            {siteMetadata.pagination.next[selectedLanguage]}
          </button>
        )}
        {nextPage && (
          <button rel="next" onClick={() => handleNextPage(nextPage)}>
            {siteMetadata.pagination.next[selectedLanguage]}
          </button>
        )}
      </nav>
    </div>
  )
}
