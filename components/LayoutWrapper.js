import { useContext, useCallback } from 'react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'

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
      <div className="flex flex-col justify-between h-screen w-11/12 mx-auto">
        <header className="flex items-center justify-between py-5">
          <div>
            <Link href="/" aria-label="Dopex Blog">
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <Logo />
                </div>
                {typeof siteMetadata.headerTitle[selectedLanguage] === 'string' ? (
                  <div className="hidden h-6 text-xl font-extrabold font-mono sm:block">
                    {siteMetadata.headerTitle[selectedLanguage]}
                  </div>
                ) : (
                  siteMetadata.headerTitle[selectedLanguage]
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks[selectedLanguage].map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-lg p-1 font-light text-stieglitz sm:p-4 dark:text-wave-blue hover:text-primary"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <select
              name="language-selector"
              id="lang-select"
              onChange={handleSelection}
              className="h-1/2 my-auto rounded-xl dark:text-wave-blue dark:bg-black text-stieglitz text-lg font-light bg-white-dark border-0"
            >
              {Object.keys(LANGUAGE_MAPPING).map((key, index) => {
                return (
                  <option value={key} key={index} className="text-right">
                    {key.substring(0, 1).toLocaleUpperCase() + key.substring(1)}
                  </option>
                )
              })}
            </select>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
