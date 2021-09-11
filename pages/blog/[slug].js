import Link from 'next/link'

import PageTitle from '@/components/PageTitle'
import Storyblok from '@/lib/utils/storyblok-service'
import Article from '@/components/Article'

export async function getStaticPaths() {
  let { data } = await Storyblok.get('cdn/links/', {
    starts_with: 'blog/',
  })

  return {
    paths: Object.values(data.links).map((p) => ({
      params: {
        slug: p.slug.split('/')[1].toString(),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params, preview = false }) {
  let slug = (await params.slug) ? params.slug : 'home'

  let sbParams = {
    version: 'published', // or 'draft'
  }

  const { data } = await Storyblok.get(`cdn/stories/blog/${slug}`, sbParams)

  return {
    props: {
      post: (await data) ? data.story : null,
      //author,
      preview,
    },
    revalidate: 3600,
  }
}

export default function Blog({ post }) {
  const { title, image, author, markdown } = post?.content

  return (
    <>
      <div className="mt-24">
        {post.content.draft ? (
          <>
            <PageTitle>
              Under Construction{' '}
              <span role="img" aria-label="roadwork sign">
                🚧
              </span>
            </PageTitle>
            <Link href={'/blog'}>
              <p className="text-center text-primary dark:text-vaporwave-blue hover:text-vaporwave-blue cursor-pointer">
                &larr; Go Back{' '}
              </p>
            </Link>
          </>
        ) : (
          <Article
            title={title}
            date={post.published_at}
            image={image}
            author={author}
            markdown={markdown}
            tag_list={post.tag_list}
          />
        )}
      </div>
    </>
  )
}
