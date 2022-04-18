import StoryblokClient from 'storyblok-js-client'

const Storyblok = new StoryblokClient({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_KEY,
  cache: {
    clear: 'auto',
    type: 'memory',
  },
})

export default Storyblok
