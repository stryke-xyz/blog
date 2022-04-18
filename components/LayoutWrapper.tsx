import { useContext, useCallback } from 'react'
import { siteMetadata } from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { LocalizationContext } from 'contexts/Localization'

import { LANGUAGE_MAPPING } from 'constants/index'

const LayoutWrapper = ({ children }) => {
  const { selectedLanguage, setSelectedLanguage } = useContext(LocalizationContext)

  const handleSelection = useCallback(
    (e) => {
      setSelectedLanguage(e.target.value)
    },
    [setSelectedLanguage]
  )

  return (
    <SectionContainer>
      <Box className="flex flex-col justify-between h-screen w-11/12 mx-auto">
        <Box className="flex items-center justify-between py-5">
          <Box>
            <Link href="/" aria-label="Dopex Blog">
              <Box className="flex items-center justify-between">
                <Box className="mr-3">
                  <Logo />
                </Box>
                <Box className="hidden h-6 text-xl font-extrabold font-mono sm:block">
                  {siteMetadata.headerTitle[selectedLanguage]}
                </Box>
              </Box>
            </Link>
          </Box>
          <Box className="flex items-center text-base leading-5">
            <Box className="hidden sm:block">
              {headerNavLinks[selectedLanguage].map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-lg p-1 font-light text-stieglitz sm:p-4 dark:text-wave-blue hover:text-primary"
                >
                  {link.title}
                </Link>
              ))}
            </Box>
            <Select
              id="lang-select"
              name="language-selector"
              value={Object.keys(LANGUAGE_MAPPING).find(
                (key) => LANGUAGE_MAPPING[key] === selectedLanguage
              )}
              onChange={handleSelection}
              classes={{ icon: 'dark:text-wave-blue text-black', select: 'px-3 py-2' }}
              className="rounded-xl dark:text-wave-blue dark:bg-black text-stieglitz text-lg font-light bg-white-dark border-0 dark:border dark:border-stieglitz"
            >
              {Object.keys(LANGUAGE_MAPPING).map((key, index) => {
                return (
                  <MenuItem value={key} key={index} className="text-right">
                    {key.substring(0, 1).toLocaleUpperCase() + key.substring(1)}
                  </MenuItem>
                )
              })}
            </Select>
            <ThemeSwitch />
            <MobileNav />
          </Box>
        </Box>
        <main className="mb-auto">{children}</main>
        <Footer />
      </Box>
    </SectionContainer>
  )
}

export default LayoutWrapper
