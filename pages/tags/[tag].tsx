import { ISbStoryData } from 'storyblok-js-client';

import { TagSEO } from 'components/SEO';

import ListLayout from 'layouts/ListLayout';

import kebabCase from 'lib/utils/kebabCase';
import Storyblok from 'lib/utils/storyblok-service';

import { siteMetadata } from 'data/siteMetadata';

export async function getStaticPaths() {
  let { data } = await Storyblok.get('cdn/tags/');

  return {
    paths: data.tags.map((tag: any) => ({
      params: {
        tag: kebabCase(tag.name),
      },
    })),
    fallback: 'blocking',
  };
}

export async function getStaticProps(context: any) {
  const _url_prefix = context.locale === 'en' ? '' : `${context.locale}/`;

  let data = await Storyblok.get(`cdn/stories/`, {
    starts_with: `${_url_prefix}articles/`,
    per_page: 100,
  });

  // Load filtered posted based on tags
  const filteredPosts = data.data.stories.filter((post: ISbStoryData) =>
    post.tag_list.map((t: string) => kebabCase(t)).includes(context.params.tag)
  );

  return {
    props: {
      posts: filteredPosts,
      tag: context.params.tag,
    },
  };
}

export default function Tag({ posts, tag }: any) {
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1).toUpperCase();
  return (
    <>
      <TagSEO
        title={`${tag} - ${siteMetadata.author}`}
        description={`${tag} tags - ${siteMetadata.author}`}
      />
      <ListLayout posts={posts} title={title} handleNextPage={() => {}} handlePrevPage={() => {}} />
    </>
  );
}
