import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center mt-16">
        <div className="flex mb-3 space-x-4">
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size="6" />
          <SocialIcon kind="discord" href={siteMetadata.discord} size="6" />
          <SocialIcon kind="github" href={siteMetadata.github} size="6" />
        </div>
        <div className="text-gray-500 dark:text-gray-400 mb-3">
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
        </div>
        <div className="flex mb-4 space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
      </div>
    </footer>
  )
}
