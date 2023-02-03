import { NextApiRequest, NextApiResponse } from 'next';
import { ISbStoryData } from 'storyblok-js-client';

import fetchStories from 'lib/utils/fetchStories';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  let revalidated = false;

  try {
    let data: ISbStoryData[] = (await fetchStories(3))
      .map((item: any) => item.stories)
      .flat()
      .sort(
        (item1: ISbStoryData, item2: ISbStoryData) =>
          new Date(item2.first_published_at!).getTime() -
          new Date(item1.first_published_at!).getTime()
      );
    let data_zh: ISbStoryData[] = (await fetchStories(3, 'zh/'))
      .map((item: any) => item.stories)
      .flat()
      .sort(
        (item1: ISbStoryData, item2: ISbStoryData) =>
          new Date(item2.first_published_at!).getTime() -
          new Date(item1.first_published_at!).getTime()
      );

    if (data.length) {
      await res.revalidate(`/${data[0].full_slug}`);
      await res.revalidate(`/${data_zh[0].full_slug}`);
      revalidated = true;
      return res.json({
        revalidated,
        stories: {
          latest: {
            en: data[0].full_slug,
            zh: data_zh[0].full_slug,
          },
          en: data,
          zh: data_zh,
        },
      });
    }
  } catch (e) {
    revalidated = false;
  }
  return res.json({ revalidated });
}
