import Link from 'next/link'
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'
import Box from '@mui/material/Box'

import formatDate from '@/lib/utils/formatDate'

import H1 from '@/components/article-body/H1'
import H2 from '@/components/article-body/H2'
import H3 from '@/components/article-body/H3'
import H4 from '@/components/article-body/H4'
import H5 from '@/components/article-body/H5'
import H6 from '@/components/article-body/H6'
import Tag from '@/components/Tag'
// import Anchor from '@/components/article-body/Anchor'
import UL from '@/components/article-body/UL'
import OL from '@/components/article-body/OL'
import LI from '@/components/article-body/LI'
import Code from '@/components/article-body/Code'
import Table from '@/components/article-body/Table'
import Blockquote from '@/components/article-body/Blockquote'
import Paragraph from '@/components/article-body/Paragraph'
import Typography from '@/components/UI/Typography'
// import Image from '@/components/article-body/Image'

interface ArticleBodyProps {
  title: string
  date: string
  image: string
  markdown: string
  tag_list: string[]
  summary?: string
  author?: any
}

export default function ArticleBody({ title, date, image, markdown, tag_list }: ArticleBodyProps) {
  return (
    <Box className="space-y-4 mx-auto">
      <Box className="text-center space-y-4">
        <Typography variant="h6" className="text-end text-stieglitz font-semibod">
          {formatDate(date)}
        </Typography>
        <hr className="border-gray-300 dark:border-gray-700"></hr>
        <Typography variant="h1">{title}</Typography>
        {tag_list.map((tag, index) => (
          <Tag key={index} text={tag} />
        ))}
      </Box>
      <img src={image} className="mx-auto my-4" alt="cover" />
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
          li: LI,
          code: Code,
          blockquote: Blockquote,
          table: Table,
          a: ({ children, href }) => {
            return (
              <a className="text-blue-500 underline cursor-pointer break-all" href={href}>
                {children}
              </a>
            )
          },
          p: Paragraph,
          img: ({ src, alt }) => {
            return <img src={src} alt={alt || 'custom'} className="mx-auto" />
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
      <hr className="border-gray-300 dark:border-gray-700 py-2" />
      <Link href={'/articles'} passHref>
        <a className="self-center xs:text-md lg:text-lg text-primary dark:text-wave-blue cursor-pointer">
          &larr; Back to Blog
        </a>
      </Link>
    </Box>
  )
}
