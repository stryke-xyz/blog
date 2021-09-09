import { ReactMarkdown } from 'react-markdown'
import * as Showdown from 'showdown'

import PageTitle from '@/components/PageTitle'
import Storyblok from '../../lib/utils/storyblok-service'

export async function getStaticPaths() {
  let { data } = await Storyblok.get('cdn/links/', {
    starts_with: 'blog/',
  })
  return {
    paths: Object.values(data.links).map((p) => ({
      params: {
        slug: [p.slug.split('/')[1]], // blog/article-# --> ['blog','article-#'] --> ['article-#']
      },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params, preview = false }) {
  let slug = params.slug ? params.slug.join('/') : 'home'

  let sbParams = {
    version: 'draft', // or 'published'
  }

  const { data } = await Storyblok.get(`cdn/stories/blog/${slug}`, sbParams)

  return {
    props: {
      post: data ? data.story : null,
      preview,
    },
    revalidate: 3600,
  }
}

export default function Blog({ post }) {
  const converter = new Showdown.Converter()
  const html = converter.makeHtml(post?.content.markdown)

  console.log(html)

  return (
    <>
      {/* Add blog article template to render markdown */}
      <div className="mt-24 text-center">
        <PageTitle>
          Under Construction{' '}
          <span role="img" aria-label="roadwork sign">
            🚧
          </span>
        </PageTitle>
        {/* <div dangerouslySetInnerHTML={{ _html: converter.makeHtml(post?.content.markdown) }} /> */}
        {/* <ReactMarkdown source={converter.makeHtml(post?.content.markdown)} /> */}
      </div>
    </>
  )
}
