import { range } from 'lodash';
import { StoryblokResult } from 'storyblok-js-client';
import Storyblok from './storyblok-service';

const fetchStories = async (pages: number, lang_path: string = '') => {
  let stories: StoryblokResult[];

  stories = await Promise.all(
    range(pages).map(async (_page) => {
      const result = Storyblok.get('cdn/stories', {
        starts_with: `${lang_path}articles/`,
        per_page: 100,
        page: _page + 1,
      }).then((res: StoryblokResult) => res.data);

      return result;
    })
  );

  return stories;
};

export default fetchStories;
