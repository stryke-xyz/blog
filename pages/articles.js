import { useState, useCallback, useContext, useEffect } from 'react'

import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import Storyblok from '../lib/utils/storyblok-service'

import { LocalizationContext } from 'contexts/Localization'

import { LANGUAGE_MAPPING, POSTS_PER_PAGE } from 'constants/index'

export async function getStaticProps() {
  let data = await Storyblok.get(`cdn/stories/`, {
    starts_with: 'articles/',
  })

  let zh_data = await Storyblok.get(`cdn/stories/`, {
    starts_with: 'zh/articles/',
  })

  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(data.data.stories?.length / POSTS_PER_PAGE),
  }

  const sortedStories = data.data?.stories
    .map((frontMatter) => frontMatter)
    .sort((item1, item2) => new Date(item2.first_published_at) - new Date(item1.first_published_at))

  const sortedStoriesZh = zh_data.data?.stories
    .map((frontMatter) => frontMatter)
    .sort((item1, item2) => new Date(item2.first_published_at) - new Date(item1.first_published_at))

  const initialDisplayPosts = {
    en: sortedStories.slice(0, POSTS_PER_PAGE * pagination.currentPage),
    zh: sortedStoriesZh.slice(0, POSTS_PER_PAGE * pagination.currentPage),
  }

  return {
    props: {
      posts: {
        en: data.data ? sortedStories : false,
        zh: zh_data.data ? sortedStoriesZh : false,
      },
      initialDisplayPosts,
      pagination,
      data: {
        en: data.data,
        zh: zh_data.data,
      },
    },
  }
}

export default function Blog({ posts, initialDisplayPosts, pagination }) {
  const { selectedLanguage, setSelectedLanguage } = useContext(LocalizationContext)

  const [listOfPosts, setListOfPosts] = useState(initialDisplayPosts[selectedLanguage])

  const handleNextPage = useCallback(
    (nextPage) => {
      if (nextPage) {
        pagination.currentPage++
        setListOfPosts(
          posts[selectedLanguage].slice(
            POSTS_PER_PAGE * (pagination.currentPage - 1),
            POSTS_PER_PAGE * pagination.currentPage
          )
        )
      }
    },
    [pagination, posts, selectedLanguage]
  )

  const handlePrevPage = useCallback(
    (prevPage) => {
      if (prevPage) {
        pagination.currentPage--
        setListOfPosts(
          posts[selectedLanguage].slice(
            POSTS_PER_PAGE * (pagination.currentPage - 1),
            POSTS_PER_PAGE * pagination.currentPage
          )
        )
      }
    },
    [pagination, posts, selectedLanguage]
  )

  const handleSelection = useCallback(
    (e) => {
      setSelectedLanguage(e.target.value)
    },
    [setSelectedLanguage]
  )

  useEffect(() => {
    setListOfPosts(
      posts[selectedLanguage].slice(
        POSTS_PER_PAGE * (pagination.currentPage - 1),
        POSTS_PER_PAGE * pagination.currentPage
      )
    )
  }, [pagination.currentPage, posts, selectedLanguage, setSelectedLanguage])

  return (
    <>
      <PageSEO title={`Blog - All Articles`} description={siteMetadata.description} />
      <div className="flex flex-row-reverse pt-6 mt-2">
        <select
          name="language-selector"
          id="lang-select"
          onChange={handleSelection}
          className="h-1/2 my-auto rounded-xl dark:text-white dark:bg-cod-gray dark:border-umbra border-primary"
        >
          {Object.keys(LANGUAGE_MAPPING).map((key, index) => {
            return (
              <option value={LANGUAGE_MAPPING.key} key={index}>
                {key}
              </option>
            )
          })}
        </select>
      </div>
      <ListLayout
        posts={posts[selectedLanguage]}
        title="All Articles"
        initialDisplayPosts={listOfPosts}
        pagination={pagination}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
    </>
  )
}
