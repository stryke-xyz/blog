import { useState, useContext } from 'react'
import Box from '@mui/material/Box'

import { siteMetadata } from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'
import trimmedSummary from '@/lib/utils/trimmedSummary'

import Typography from '@/components/UI/Typography'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Pagination from '@/components/Pagination'

import { LocalizationContext } from 'contexts/Localization'

interface ListLayoutProps {
  posts: any
  title: string
  initialDisplayPosts?: []
  pagination?: {
    currentPage: number
    totalPages: number
  }
  handleNextPage?: Function
  handlePrevPage?: Function
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  handleNextPage,
  handlePrevPage,
}: ListLayoutProps) {
  const { selectedLanguage } = useContext(LocalizationContext)

  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent =
      frontMatter.content.title + frontMatter.content.summary + frontMatter.tag_list?.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If posts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <Box className="divide-y">
        <Box className="pt-2 pb-8 space-y-2 md:space-y-5">
          <Typography
            variant="h1"
            className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
          >
            {title}
          </Typography>
          <Box className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={siteMetadata.searchPlaceholder[selectedLanguage]}
              className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </Box>
        </Box>
        <ul>
          {!filteredBlogPosts.length ? (
            <Box className="flex justify-around m-3">
              <Typography variant="h6" className="font-mono">
                No posts found
              </Typography>
            </Box>
          ) : null}

          {displayPosts.map((frontMatter) => {
            const { title, summary } = frontMatter.content
            const { full_slug, first_published_at, tag_list } = frontMatter
            return (
              <li key={full_slug} className="py-4">
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={first_published_at}>{formatDate(first_published_at)}</time>
                    </dd>
                  </dl>
                  <Box className="space-y-3 xl:col-span-3">
                    <Box>
                      <Typography
                        variant="h3"
                        className="text-2xl font-semibold leading-8 tracking-tight"
                      >
                        <Link href={`/${full_slug}`} className="text-gray-900 dark:text-gray-100">
                          {title}
                        </Link>
                      </Typography>
                      <Box className="flex flex-wrap">
                        {tag_list?.map((tag, index) => (
                          <Tag key={index} text={tag} />
                        ))}
                      </Box>
                    </Box>
                    <Box className="prose text-stieglitz max-w-none dark:text-gray-400">
                      {trimmedSummary(summary)}
                    </Box>
                  </Box>
                </article>
              </li>
            )
          })}
        </ul>
      </Box>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      )}
    </>
  )
}
