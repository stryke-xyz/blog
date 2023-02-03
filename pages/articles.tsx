import { useState, useCallback, useContext, useEffect } from 'react';

import { PageSEO } from 'components/SEO';

import ListLayout from 'layouts/ListLayout';

import { LocalizationContext } from 'contexts/Localization';

import { siteMetadata } from 'data/siteMetadata';

import { POSTS_PER_PAGE } from 'constants/index';

export async function getStaticProps() {
  const { stories } = await fetch(
    'https://blog-git-fix-on-demand-isr-dopex-io.vercel.app/api/revalidate'
  ).then((res) => res.json());

  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(stories['en']?.length / POSTS_PER_PAGE),
  };

  const initialDisplayPosts = {
    en: stories['en'].slice(0, POSTS_PER_PAGE * pagination.currentPage),
    zh: stories['zh'].slice(0, POSTS_PER_PAGE * pagination.currentPage),
  };

  return {
    props: {
      posts: {
        en: stories['en'],
        zh: stories['zh'],
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
