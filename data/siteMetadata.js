const siteMetadata = {
  title: {
    en: 'Dopex Blog',
    zh: 'Dopex Nihao',
  },
  author: 'Dopex',
  headerTitle: {
    en: 'BLOG',
    zh: '博客',
  },
  description: {
    en: 'The Official Decentralized Options Exchange (Dopex) Blog',
    zh: '官方去中心化期权交易所 (Dopex) 博客',
  },
  language: 'en-us',
  siteUrl: 'https://blog.dopex.io', //enter deployed site url here ending with /
  siteRepo: '###',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.png',
  socialBanner: '/static/images/twitter-card.png',
  github: 'https://github.com/dopex-io',
  twitter: 'https://twitter.com/dopex_io',
  discord: 'https://discord.gg/dopex',
  locale: 'en-US',
  analytics: {
    // supports plausible, simpleAnalytics or googleAnalytics
    plausibleDataDomain: '', // e.g. blog.vercel.app
    simpleAnalytics: false, // true or false
    googleAnalyticsId: '', // e.g. UA-000000-2 or G-XXXXXXX
  },
}

module.exports = siteMetadata
