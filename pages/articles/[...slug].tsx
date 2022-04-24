import Link from 'next/link';

import PageTitle from 'components/PageTitle';
import Article from 'components/Article';
import { BlogSEO } from 'components/SEO';

import Storyblok from 'lib/utils/storyblok-service';

export async function getStaticPaths() {
  let { data } = await Storyblok.get('cdn/links/');

  let paths = Object.values(data.links)
    .filter((p: any) => p.slug && !p.is_folder)
    .map((p: any) => ({
      params: {
        slug: p.slug?.split(/\/|,/).slice(1),
      },
    }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params, preview = false }: any) {
  let slug = (await params.slug) ? params.slug.join('/') : 'home';

  const { data } = await Storyblok.get(`cdn/stories/articles/${slug}`);

  return {
    props: {
      post: (await data) ? data?.story : null,
      preview,
    },
    revalidate: 60,
  };
}

export default function Blog({ post }: any) {
  const { title, summary, image, /*author,*/ markdown } = post.content;

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
            <Link href={'/'} passHref>
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
            markdown={markdown}
            tag_list={post.tag_list}
          />
        )}
      </div>
    </>
  );
}
