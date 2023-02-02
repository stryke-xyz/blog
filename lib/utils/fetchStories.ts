import { range } from 'lodash';
import { ISbResult } from 'storyblok-js-client';
import Storyblok from './storyblok-service';

const fetchStories = async (pages: number, lang_path: string = '') => {
  let stories: ISbResult[];

  stories = await Promise.all(
    range(pages).map(async (_page) => {
      const result = Storyblok.get('cdn/stories', {
        starts_with: `${lang_path}articles/`,
        per_page: 100,
        page: _page + 1,
        cv: Math.floor(new Date().getTime() / 1000), // latest cache version
      }).then((res: ISbResult) => res.data);

      return result;
    })
  );

  return stories;
};

export default fetchStories;
