import { useState, useEffect, useCallback } from 'react'

import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import Storyblok from '../lib/utils/storyblok-service'

export const POSTS_PER_PAGE = 5

export async function getStaticProps(context) {
  let params = {
    version: 'draft',
  }

  if (context.preview) {
    params.version = 'draft'
    params.cv = Date.now()
  }

  let { data } = await Storyblok.get(`cdn/stories/`, {
    page: 1,
    starts_with: 'articles/',
  })

  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(data.stories?.length / POSTS_PER_PAGE),
  }

  const sortedStories = data?.stories
    .map((frontMatter) => frontMatter)
    .sort((item1, item2) => new Date(item2.first_published_at) - new Date(item1.first_published_at))

  const initialDisplayPosts = sortedStories.slice(0, POSTS_PER_PAGE * pagination.currentPage)

  return {
    props: {
      posts: data ? sortedStories : [],
      initialDisplayPosts,
      pagination,
      data,
    },
  }
}

export default function Blog({ posts, initialDisplayPosts, pagination }) {
  const [listOfPosts, setListOfPosts] = useState(initialDisplayPosts)

  const handleNextPage = useCallback(
    (nextPage) => {
      if (nextPage) {
        pagination.currentPage++
        setListOfPosts(
          posts.slice(
            POSTS_PER_PAGE * (pagination.currentPage - 1),
            POSTS_PER_PAGE * pagination.currentPage
          )
        )
      }
    },
    [pagination, posts]
  )

  const handlePrevPage = useCallback(
    (prevPage) => {
      if (prevPage) {
        pagination.currentPage--
        setListOfPosts(
          posts.slice(
            POSTS_PER_PAGE * (pagination.currentPage - 1),
            POSTS_PER_PAGE * pagination.currentPage
          )
        )
      }
    },
    [pagination, posts]
  )

  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        title="All Articles"
        initialDisplayPosts={listOfPosts}
        pagination={pagination}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
    </>
  )
}
