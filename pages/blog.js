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

  let { data } = await Storyblok.get(`cdn/stories/${slug}`, params)

  const initialDisplayPosts = data?.story.content.body.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(data.story.content.body?.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      posts: data ? data.story : false,
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
        posts={posts.content.body}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}
