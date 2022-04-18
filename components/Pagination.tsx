import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import Typography from '@/components/UI/Typography'

import { useContext } from 'react'

import { LocalizationContext } from 'contexts/Localization'
import { siteMetadata } from '@/data/siteMetadata'

export default function Pagination({ totalPages, currentPage, handleNextPage, handlePrevPage }) {
  const { selectedLanguage } = useContext(LocalizationContext)
  const prevPage = parseInt(currentPage) - 1 > 0
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)

  return (
    <Box className="pt-6 pb-8 space-y-2 md:space-y-5">
      <Box className="flex justify-between">
        {!prevPage && (
          <Button
            aria-label="previous"
            className="cursor-auto disabled:opacity-50"
            disabled={!prevPage}
          >
            {siteMetadata.pagination.previous[selectedLanguage]}
          </Button>
        )}
        {prevPage && (
          <Button aria-label="previous" onClick={() => handlePrevPage(prevPage)}>
            {siteMetadata.pagination.previous[selectedLanguage]}
          </Button>
        )}
        <Typography variant="h6" className="text-white">
          {currentPage} / {totalPages}
        </Typography>
        {!nextPage && (
          <Button
            aria-label="next"
            className="cursor-auto disabled:opacity-50"
            disabled={!nextPage}
          >
            {siteMetadata.pagination.next[selectedLanguage]}
          </Button>
        )}
        {nextPage && (
          <Button aria-label="next" onClick={() => handleNextPage(nextPage)}>
            {siteMetadata.pagination.next[selectedLanguage]}
          </Button>
        )}
      </Box>
    </Box>
  )
}
