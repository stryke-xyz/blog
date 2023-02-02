import { useState, useCallback, useContext, useEffect } from 'react';
import { ISbStoryData } from 'storyblok-js-client';

import { PageSEO } from 'components/SEO';

import ListLayout from 'layouts/ListLayout';

import { LocalizationContext } from 'contexts/Localization';

import { siteMetadata } from 'data/siteMetadata';
import fetchStories from 'lib/utils/fetchStories';

import { POSTS_PER_PAGE } from 'constants/index';

export async function getStaticProps() {
  const data: ISbStoryData[] = (await fetchStories(3))
    .map((item: any) => item.stories)
    .flat()
    .map((frontMatter: ISbStoryData) => frontMatter)
    .sort(
      (item1: ISbStoryData, item2: ISbStoryData) =>
        new Date(item2.first_published_at!).getTime() -
        new Date(item1.first_published_at!).getTime()
    );

  let zh_data: ISbStoryData[] = (await fetchStories(3))
    .map((item: any) => item.stories)
    .flat()
    .map((frontMatter: ISbStoryData) => frontMatter)
    .sort(
      (item1: ISbStoryData, item2: ISbStoryData) =>
        new Date(item2.first_published_at!).getTime() -
        new Date(item1.first_published_at!).getTime()
    );

  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(data?.length / POSTS_PER_PAGE),
  };

  const sortedStories = zh_data
    .map((frontMatter: ISbStoryData) => frontMatter)
    .sort(
      (item1: ISbStoryData, item2: ISbStoryData) =>
        new Date(item2.first_published_at!).getTime() -
        new Date(item1.first_published_at!).getTime()
    );

  const sortedStoriesZh = zh_data
    .map((frontMatter: ISbStoryData) => frontMatter)
    .sort(
      (item1: ISbStoryData, item2: ISbStoryData) =>
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
        en: sortedStories,
        zh: sortedStoriesZh,
      },
      initialDisplayPosts,
      pagination,
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
    (async () => {
      await fetch('/api/revalidate');
    })();
  }, []);

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
