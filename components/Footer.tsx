import { useContext } from 'react'
import Box from '@mui/material/Box'

import { siteMetadata } from '@/data/siteMetadata'

import Link from '@/components/Link'
import SocialIcon from '@/components/social-icons'

import { LocalizationContext } from 'contexts/Localization'

export default function Footer() {
  const { selectedLanguage } = useContext(LocalizationContext)
  return (
    <footer>
      <Box className="flex flex-col items-center mt-16">
        <Box className="flex mb-3 space-x-4">
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
          <SocialIcon kind="discord" href={siteMetadata.discord} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
        </Box>
        <Box className="text-gray-500 dark:text-gray-400 mb-3">
          <a
            className="hover:text-blue-500 dark:hover:text-blue-400"
            href="https://dopex.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Site
          </a>{' '}
          |{' '}
          <a
            className="hover:text-blue-500 dark:hover:text-blue-400"
            href="https://app.dopex.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            App
          </a>
        </Box>
        <Box className="flex mb-4 space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Box>{siteMetadata.author}</Box>
          <Box>{` • `}</Box>
          <Box>{`© ${new Date().getFullYear()}`}</Box>
          <Box>{` • `}</Box>
          <Link href="/">{siteMetadata.title[selectedLanguage]}</Link>
        </Box>
      </Box>
    </footer>
  )
}
