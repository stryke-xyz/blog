import { useContext } from 'react';
import { StoryData } from 'storyblok-js-client';

import { TagSEO } from 'components/SEO';

import ListLayout from 'layouts/ListLayout';

import { LocalizationContext } from 'contexts/Localization';

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

export async function getStaticProps({ params }: any) {
  let data = await Storyblok.get(`cdn/stories/`, {
    starts_with: 'articles/',
    per_page: 100,
  });

  let zh_data = await Storyblok.get(`cdn/stories/`, {
    starts_with: 'zh/articles/',
    per_page: 100,
  });

  // Load filtered posted based on tags
  const filteredPosts = data.data.stories.filter((post: StoryData) =>
    post.tag_list.map((t: string) => kebabCase(t)).includes(params.tag)
  );

  const filteredPostsZh = zh_data.data.stories.filter((post: StoryData) =>
    post.tag_list.map((t: string) => kebabCase(t)).includes(params.tag)
  );

  return {
    props: {
      posts: {
        en: filteredPosts,
        zh: filteredPostsZh,
      },
      tag: params.tag,
    },
  };
}

export default function Tag({ posts, tag }: any) {
  const { selectedLanguage } = useContext(LocalizationContext);

  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1).toUpperCase();
  return (
    <>
      <TagSEO
        title={`${tag} - ${siteMetadata.author}`}
        description={`${tag} tags - ${siteMetadata.author}`}
      />
      <ListLayout
        posts={posts[selectedLanguage]}
        title={title}
        handleNextPage={() => {}}
        handlePrevPage={() => {}}
      />
    </>
  );
}
