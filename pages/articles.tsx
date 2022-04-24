import { useState, useCallback, useContext, useEffect } from 'react';
import { StoryData } from 'storyblok-js-client';

import { PageSEO } from 'components/SEO';

import ListLayout from 'layouts/ListLayout';

import { LocalizationContext } from 'contexts/Localization';

import Storyblok from 'lib/utils/storyblok-service';

import { siteMetadata } from 'data/siteMetadata';

import { POSTS_PER_PAGE } from 'constants/index';

export async function getStaticProps() {
  let data = await Storyblok.get(`cdn/stories/`, {
    starts_with: 'articles/',
    per_page: 100,
  });

  let zh_data = await Storyblok.get(`cdn/stories/`, {
    starts_with: 'zh/articles/',
    per_page: 100,
  });

  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(data.data.stories?.length / POSTS_PER_PAGE),
  };

  const sortedStories = data.data?.stories
    .map((frontMatter: StoryData) => frontMatter)
    .sort(
      (item1: StoryData, item2: StoryData) =>
        new Date(item2.first_published_at!).getTime() -
        new Date(item1.first_published_at!).getTime()
    );

  const sortedStoriesZh = zh_data.data?.stories
    .map((frontMatter: StoryData) => frontMatter)
    .sort(
      (item1: StoryData, item2: StoryData) =>
        new Date(item2.first_published_at!).getTime() -
        new Date(item1.first_published_at!).getTime()
    );

  const initialDisplayPosts = {
    en: sortedStories.slice(0, POSTS_PER_PAGE * pagination.currentPage),
    zh: sortedStoriesZh.slice(0, POSTS_PER_PAGE * pagination.currentPage),
  };

  return {
    props: {
      posts: {
        en: data.data ? sortedStories : false,
        zh: zh_data.data ? sortedStoriesZh : false,
      },
      initialDisplayPosts,
      pagination,
      data: {
        en: data.data,
        zh: zh_data.data,
      },
    },
  };
}

export default function Blog({ posts, initialDisplayPosts, pagination }: any) {
  const { selectedLanguage, setSelectedLanguage } = useContext(LocalizationContext);

  const [listOfPosts, setListOfPosts] = useState(initialDisplayPosts[selectedLanguage]);

  const handleNextPage = useCallback(
    (nextPage: any) => {
      if (nextPage) {
        pagination.currentPage++;
        setListOfPosts(
          posts[selectedLanguage].slice(
            POSTS_PER_PAGE * (pagination.currentPage - 1),
            POSTS_PER_PAGE * pagination.currentPage
          )
        );
      }
    },
    [pagination, posts, selectedLanguage]
  );

  const handlePrevPage = useCallback(
    (prevPage: any) => {
      if (prevPage) {
        pagination.currentPage--;
        setListOfPosts(
          posts[selectedLanguage].slice(
            POSTS_PER_PAGE * (pagination.currentPage - 1),
            POSTS_PER_PAGE * pagination.currentPage
          )
        );
      }
    },
    [pagination, posts, selectedLanguage]
  );

  useEffect(() => {
    setListOfPosts(
      posts[selectedLanguage].slice(
        POSTS_PER_PAGE * (pagination.currentPage - 1),
        POSTS_PER_PAGE * pagination.currentPage
      )
    );
  }, [pagination.currentPage, posts, selectedLanguage, setSelectedLanguage]);

  return (
    <>
      <PageSEO
        title={`Blog - All Articles`}
        description={siteMetadata.description[selectedLanguage]}
      />
      <ListLayout
        posts={posts[selectedLanguage]}
        title={siteMetadata.allArticles[selectedLanguage]}
        initialDisplayPosts={listOfPosts}
        pagination={pagination}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
    </>
  );
}
