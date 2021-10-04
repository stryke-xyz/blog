import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'

import siteMetadata from '@/data/siteMetadata'

import formatDate from '@/lib/utils/formatDate'
import trimmedSummary from '@/lib/utils/trimmedSummary'
import Storyblok from '@/lib/utils/storyblok-service'

const MAX_DISPLAY = 5

export async function getStaticProps(context) {
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

  return {
    props: {
      stories: data ? data.stories : false,
      preview: context.preview || false,
      data,
    },
    revalidate: 10,
  }
}

export default function Home({ stories }) {
  const sortedStories = stories
    .slice(0, MAX_DISPLAY)
    .map((frontMatter) => frontMatter)
    .sort((item1, item2) => new Date(item2.published_at) - new Date(item1.published_at))

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <p className="text-lg leading-7 text-stieglitz dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!sortedStories.length && 'No posts found.'}
          {sortedStories.map((frontMatter, index) => {
            const { title, summary, image } = frontMatter.content
            const { full_slug, /*tag_list,*/ published_at } = frontMatter
            return (
              <li key={index} className="py-6">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-6 gap-3 xl:space-y-0">
                    <img src={image} className="sm:w-full rounded-md col-span-2" />
                    <div className="space-y-5 xl:col-span-4">
                      <div className="space-y-1">
                        <div>
                          <h2 className="text-2xl font-bold">
                            <Link
                              href={`/${full_slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <dl>
                            <dt className="sr-only">Published on</dt>
                            <dd className="text-base font-medium leading-6 text-stieglitz dark:text-gray-400">
                              <time dateTime={published_at}>{formatDate(published_at)}</time>
                            </dd>
                          </dl>
                        </div>
                        <div className="prose text-stieglitz max-w-none dark:text-gray-400">
                          {trimmedSummary(summary)}
                        </div>
                        <div className="text-base font-medium leading-6 place-self-end">
                          <Link
                            href={`/${full_slug}`}
                            className="text-primary dark:text-wave-blue dark:hover:text-blue-300"
                            aria-label={`Read "${title}"`}
                          >
                            Read more &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {sortedStories.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-blue-500 hover:text-blue-600 dark:hover:text-primary"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
