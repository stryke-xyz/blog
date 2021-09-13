import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-2 text-sm font-medium uppercase text-primary dark:text-wave-blue">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
