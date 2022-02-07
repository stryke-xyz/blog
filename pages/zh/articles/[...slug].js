import Link from 'next/link'

import PageTitle from '@/components/PageTitle'
import Article from '@/components/Article'
import { BlogSEO } from '@/components/SEO'

import Storyblok from '@/lib/utils/storyblok-service'

export async function getStaticPaths() {
  let { data } = await Storyblok.get('cdn/links/')

  let paths_zh = Object.values(data.links)
    .filter((p) => p.slug && !p.is_folder)
    .map((link) => ({
      params: {
        slug: (link.alternates[0].lang + '/' + link.alternates[0].path).split(/\/|,/).slice(2),
      },
    }))

  return {
    paths: paths_zh,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params, preview = false }) {
  let slug = (await params.slug) ? params.slug.join('/') : 'home'

  console.log(slug)

  const { data } = await Storyblok.get(`cdn/stories/articles/${slug}?language=zh`)

  return {
    props: {
      post: (await data) ? data?.story : null,
      preview,
    },
    revalidate: 60,
  }
}

export default function Blog({ post }) {
  const { title, summary, image, author, markdown } = post.content

  return (
    <>
      <BlogSEO title={title} summary={summary} date={post?.first_published_at} images={[image]} />
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
            summary={summary}
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