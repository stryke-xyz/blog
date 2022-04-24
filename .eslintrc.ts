module.exports = {
  root: true,
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'next', 'next/core-web-vitals'],
  rules: {
    'prettier/prettier': ['off', { singleQuote: true, parser: 'flow', usePrettierrc: false }],
    'react/prop-types': 0,
    'react/no-unescaped-entities': 0,
    '@next/next/no-img-element': 0,
  },
};
