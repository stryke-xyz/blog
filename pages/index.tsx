import { useState, useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import delay from 'lodash/delay';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Stories, StoryData } from 'storyblok-js-client';

import Link from 'components/Link';
import { PageSEO } from 'components/SEO';

import formatDate from 'lib/utils/formatDate';
import trimmedSummary from 'lib/utils/trimmedSummary';
import Storyblok from 'lib/utils/storyblok-service';
import kebabCase from 'lib/utils/kebabCase';

import { siteMetadata } from 'data/siteMetadata';

import { LocalizationContext } from 'contexts/Localization';

import { Languages } from 'types';

export async function getStaticProps(context: any) {
  let data: Stories = await Storyblok.get(`cdn/stories/`, {
    starts_with: 'articles/',
    per_page: 100,
  });

  let zh_data: Stories = await Storyblok.get(`cdn/stories/`, {
    starts_with: 'zh/articles/',
    per_page: 100,
  });

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

  return {
    props: {
      stories: {
        en: data.data ? sortedStories : [],
        zh: zh_data.data ? sortedStoriesZh : [],
      },
      preview: context.preview || [],
      data: {
        en: data.data,
        zh: zh_data.data,
      },
    },
    revalidate: 60,
  };
}

type Story = StoryData<{ title: string; summary: string; image: string }>;

interface HomeProps {
  stories: {
    [key in Languages]: Story[];
  };
}

export default function Home({ stories }: HomeProps) {
  const router = useRouter();

  const [displayed, setDisplayed] = useState(5);
  const { selectedLanguage } = useContext(LocalizationContext);

  const all_tags = [
    ...new Set(stories[selectedLanguage].map((frontMatter: Story) => frontMatter.tag_list).flat()),
  ];

  let displayedStories = stories[selectedLanguage]
    ?.slice(0, displayed)
    .map((frontMatter: Story) => frontMatter);

  const handleDisplayed = useCallback(() => {
    delay(() => setDisplayed(displayed + 5), 1000);
  }, [displayed]);

  const handleSelection = useCallback(
    (e: any) => {
      router.push('tags/' + kebabCase(e.target.value));
    },
    [router]
  );

  return (
    <>
      <PageSEO
        title={siteMetadata.title[selectedLanguage]}
        description={siteMetadata.description[selectedLanguage]}
      />

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {siteMetadata.pageTitle[selectedLanguage]}
          </h1>
          <div className="flex justify-between">
            <p className="text-lg my-auto leading-7 text-stieglitz dark:text-gray-400">
              {siteMetadata.description[selectedLanguage]}
            </p>
            <Select
              name="tag-selector"
              id="tag-select"
              onChange={handleSelection}
              value={siteMetadata.tagFilter[selectedLanguage]}
              className="hidden lg:flex w-1/4 my-auto rounded-xl dark:text-wave-blue dark:bg-black text-stieglitz sm:text-md text-md font-light bg-white-dark border-0 dark:border dark:border-stieglitz"
              classes={{ icon: 'dark:text-wave-blue text-black', select: 'px-3 py-2' }}
            >
              {[siteMetadata.tagFilter[selectedLanguage]].concat(all_tags).map((tag, index) => (
                <MenuItem key={index} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="flex justify-center">
            <Select
              name="tag-selector"
              id="tag-select"
              value={siteMetadata.tagFilter[selectedLanguage]}
              onChange={handleSelection}
              classes={{ icon: 'dark:text-wave-blue text-black', select: 'px-3 py-2' }}
              className="block lg:hidden w-1/3 my-auto rounded-xl dark:text-wave-blue dark:bg-black text-stieglitz text-sm font-light bg-white-dark border-0 dark:border-2 dark:border-stieglitz"
            >
              {[siteMetadata.tagFilter[selectedLanguage]].concat(all_tags).map((tag, index) => (
                <MenuItem key={index} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!stories[selectedLanguage].length && 'No posts found.'}
          <InfiniteScroll
            dataLength={displayed}
            hasMore={stories[selectedLanguage].length > displayed}
            loader={<h4 className="text-center">Loading...</h4>}
            next={handleDisplayed}
            endMessage={<p className="text-center">{siteMetadata.loadedText[selectedLanguage]}</p>}
            scrollThreshold={1.01}
          >
            {displayedStories?.map((frontMatter: Story, index: number) => {
              const { title, summary, image } = frontMatter.content;
              const { full_slug, first_published_at } = frontMatter;
              return (
                <li key={index} className="py-6">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-6 gap-3 xl:space-y-0">
                      <Link href={`/${full_slug}`} className={'col-span-2 xl:mr-5'}>
                        <img src={image} className="sm:w-full rounded-md" alt={title} />
                      </Link>
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
                                <time dateTime={String(first_published_at)}>
                                  {formatDate(String(first_published_at))}
                                </time>
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
              );
            })}
          </InfiniteScroll>
        </ul>
      </div>
    </>
  );
}
