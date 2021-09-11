import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import Storyblok from '../lib/utils/storyblok-service'

export const POSTS_PER_PAGE = 5

export async function getStaticProps(context) {
  const slug = 'home'
  let params = {
    version: 'draft',
  }

  if (context.preview) {
    params.version = 'draft'
    params.cv = Date.now()
  }

  let { data } = await Storyblok.get(`cdn/stories/`, {
    per_page: 5,
    page: 1,
    starts_with: 'blog/',
  })

  const initialDisplayPosts = data?.stories.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(data.stories?.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      posts: data ? data.stories : false,
      initialDisplayPosts,
      pagination,
      data,
    },
  }
}

export default function Blog({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}
