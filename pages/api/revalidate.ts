import { NextApiRequest, NextApiResponse } from 'next';
import { ISbStories, ISbStoryData } from 'storyblok-js-client';

import Storyblok from 'lib/utils/storyblok-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.NEXT_PUBLIC_API_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  let data: ISbStories = await Storyblok.get(`cdn/stories/`, {
    starts_with: 'articles/',
    per_page: 100,
  });

  const sortedStories = data.data?.stories
    .map((frontMatter: ISbStoryData) => frontMatter)
    .sort(
      (item1: ISbStoryData, item2: ISbStoryData) =>
        new Date(item2.first_published_at!).getTime() -
        new Date(item1.first_published_at!).getTime()
    );

  try {
    // revalidate latest article slug
    await res.revalidate(`/${sortedStories[0].full_slug}`);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
