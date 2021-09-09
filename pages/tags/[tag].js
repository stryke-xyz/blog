import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import kebabCase from '@/lib/utils/kebabCase'
import Storyblok from '@/lib/utils/storyblok-service'

export async function getStaticPaths() {
  let { data } = await Storyblok.get('cdn/tags/')

  return {
    paths: data.tags.map((tag) => ({
      params: {
        tag: tag.name,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { data } = await Storyblok.get(`cdn/stories/`, {
    starts_with: 'blog/',
  })

  //load filtered posted based on tags
  const filteredPosts = data.stories.filter((post) =>
    post.tag_list.map((t) => kebabCase(t)).includes(params.tag)
  )

  return { props: { posts: filteredPosts, tag: params.tag } }
}

export default function Tag({ posts, tag }) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
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
