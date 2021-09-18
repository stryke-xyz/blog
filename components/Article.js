import Link from 'next/link'
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'

import formatDate from '@/lib/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'

import { PageSEO } from './SEO'

import H1 from '@/components/article-body/H1'
import H2 from '@/components/article-body/H2'
import H3 from '@/components/article-body/H3'
import H4 from '@/components/article-body/H4'
import H5 from '@/components/article-body/H5'
import H6 from '@/components/article-body/H6'
import Tag from '@/components/Tag'
import Anchor from '@/components/article-body/Anchor'
import UL from '@/components/article-body/UL'
import OL from '@/components/article-body/OL'
import Code from '@/components/article-body/Code'
import Table from '@/components/article-body/Table'
import Blockquote from '@/components/article-body/Blockquote'
import Paragraph from '@/components/article-body/Paragraph'
import Image from '@/components/article-body/Image'

export default function ArticleBody({ title, date, image, author, markdown, tag_list }) {
  return (
    <div className="space-y-4">
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="text-center space-y-4">
        <h2 className="text-end text-gray-400">{formatDate(date)}</h2>
        <hr className="border-gray-300 dark:border-gray-700"></hr>
        <h1 className="text-3xl font-serif font-normal leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          {title}
        </h1>
        {tag_list.map((tag, index) => (
          <Tag key={index} text={tag} />
        ))}
      </div>
      <img src={image} className="mx-auto my-4" alt="cover" layout="fill" />
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: H1,
          h2: H2,
          h3: H3,
          h4: H4,
          h5: H5,
          h6: H6,
          ul: UL,
          ol: OL,
          li: ({ children }) => <li className="py-2">{children}</li>,
          code: Code,
          blockquote: Blockquote,
          table: Table,
          a: Anchor,
          p: Paragraph,
          img: Image,
        }}
      >
        {markdown}
      </ReactMarkdown>
      <hr className="border-gray-300 dark:border-gray-700 py-2" />
      <Link href={'/blog'}>
        <span className="self-center text-xl text-primary dark:text-wave-blue cursor-pointer">
          &larr; Back to Blog
        </span>
      </Link>
    </div>
  )
}
