import { TagSEO } from '@/components/SEO'

import ListLayout from '@/layouts/ListLayout'

import kebabCase from '@/lib/utils/kebabCase'
import Storyblok from '@/lib/utils/storyblok-service'

import siteMetadata from '@/data/siteMetadata'

export async function getStaticPaths() {
  let { data } = await Storyblok.get('cdn/tags/')

  return {
    paths: data.tags.map((tag) => ({
      params: {
        tag: kebabCase(tag.name),
      },
    })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const { data } = await Storyblok.get(`cdn/stories/`, {
    starts_with: 'articles/',
  })

  // Load filtered posted based on tags
  const filteredPosts = data.stories.filter((post) =>
    post.tag_list.map((t) => kebabCase(t)).includes(params.tag)
  )

  return { props: { posts: filteredPosts, tag: params.tag } }
}

export default function Tag({ posts, tag }) {
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1).toUpperCase()
  return (
    <>
      <TagSEO
        title={`${tag} - ${siteMetadata.author}`}
        description={`${tag} tags - ${siteMetadata.author}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  )
}
