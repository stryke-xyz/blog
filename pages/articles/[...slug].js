import Link from 'next/link'

import PageTitle from '@/components/PageTitle'
import Storyblok from '@/lib/utils/storyblok-service'
import Article from '@/components/Article'

export async function getStaticPaths() {
  let { data } = await Storyblok.get('cdn/links/', {
    starts_with: 'articles/',
  })

  return {
    paths: Object.values(data.links)
      .filter((p) => p.path)
      .map((p) => ({
        params: {
          slug: p.slug?.split(/\/|,/).slice(1),
        },
      })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params, preview = false }) {
  let slug = (await params.slug) ? params.slug.join('/') : 'home'

  let sbParams = {
    version: 'published', // or 'draft'
  }

  const { data } = await Storyblok.get(`cdn/stories/articles/${[slug]}`, sbParams)

  return {
    props: {
      post: (await data) ? data?.story : null,
      //author,
      preview,
    },
    revalidate: 3600,
  }
}

export default function Blog({ post }) {
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { title, image, author, markdown } = post?.content

  return (
    <>
      <div className="mt-24 mx-auto">
        {post.content.draft ? (
          <>
            <PageTitle>
              Under Construction{' '}
              <span role="img" aria-label="roadwork sign">
                🚧
              </span>
            </PageTitle>
            <Link passHref={'/'}>
              <p className="text-center text-primary dark:text-wave-blue hover:text-wave-blue cursor-pointer">
                &larr; Go Back{' '}
              </p>
            </Link>
          </>
        ) : (
          <Article
            title={title}
            date={post.first_published_at}
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
