const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  eslint: {
    dirs: ['pages', 'components', 'lib', 'layouts', 'scripts'],
  },
  // experimental: { esmExternals: true },
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    if (!dev && !isServer) {
      // Replace React with Preact only in client production build
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    return config
  },

  async redirects() {
    return [
      {
        source: '/dopex-will-list-binance-coin-bnb-1bbcc890c25f',
        destination: '/articles/ssov/dopex-will-list-binance-coin-bnb',
        permanent: false,
      },
      {
        source: '/introducing-the-redacted-option-vaults-947ad9b03f9f',
        destination: '/articles/introducing-the-redacted-option-vaults',
        permanent: false,
      },
      {
        source: '/gohm-single-staking-option-vaults-d39db21c717f',
        destination: '/articles/ssov/gohm-single-staking-option-vaults',
        permanent: false,
      },
      {
        source: '/dopex-insider-team-q-a-part-2-e6bcd3c02172',
        destination: '/articles/dopex-insider/dopex-insider-team-q-a-part-2',
        permanent: false,
      },
      {
        source: '/eth-single-staking-option-vaults-77bcc32c04f9',
        destination: '/articles/ssov/eth-single-staking-option-vaults',
        permanent: false,
      },
      {
        source: '/dopex-insider-team-q-a-part-1-4c6b96ace25c',
        destination: '/articles/dopex-insider/dopex-insider-team-q-a-part-1',
        permanent: false,
      },
      {
        source: '/rdpx-single-staking-option-vaults-1d485567b95b',
        destination: '/articles/ssov/rdpx-single-staking-option-vaults',
        permanent: false,
      },
      {
        source: '/dopex-ssov-strategies-7da338cba511',
        destination: '/articles/ssov/dopex-ssov-strategies',
        permanent: false,
      },
      {
        source: '/dopex-essentials-covered-call-e969cc4d9c13',
        destination: '/articles/dopex-essentials/dopex-essentials-covered-call',
        permanent: false,
      },
      {
        source: '/dopex-farm-migration-to-arbitrum-fc6c66828470',
        destination: '/articles/dopex-farm-migration-to-arbitrum',
        permanent: false,
      },
      {
        source: '/rdpx-bull-thesis-undervalued-or-misunderstood-40e7d9bf14f7',
        destination: '/articles/bull-theses/-rdpx-bull-thesis-undervalued-or-misunderstood',
        permanent: false,
      },
      {
        source: '/this-week-in-dopex-15-8-22-8-6e051a07c1a1',
        destination: '/articles/this-week-in-dopex-15-8-22-8',
        permanent: false,
      },
      {
        source: '/introducing-single-staking-option-vaults-ssov-b90bbb0a9ae5',
        destination: '/articles/ssov/dopex-ssov-testnet',
        permanent: false,
      },
      {
        source: '/dpx-single-staking-option-vaults-2b2dbda540f9',
        destination: '/articles/ssov/dopex-single-staking-option-vaults-ssov',
        permanent: false,
      },
      {
        source: '/essentials-series-option-vega-1c435a92bad0',
        destination: '/articles/dopex-essentials/dopex-essentials-option-vega',
        permanent: false,
      },
      {
        source: '/essentials-series-option-theta-a412f666434f',
        destination: '/articles/dopex-essentials/dopex-essentials-option-theta',
        permanent: false,
      },
      {
        source: '/dopex-essentials-option-gamma-part-1-43d80ca3070',
        destination: '/articles/dopex-essentials/dopex-essentials-option-gamma',
        permanent: false,
      },
      {
        source: '/essentials-series-option-delta-bd9f19017c7d',
        destination: '/articles/dopex-essentials/dopex-essentials-option-delta',
        permanent: false,
      },
      {
        source: '/options-greeks-a-brief-overview-ab24d4fe70ad',
        destination: '/articles/dopex-essentials/dopex-essentials-option-greeks-a-brief-overview',
        permanent: false,
      },
      {
        source: '/atm-itm-otm-98d3d09c1f4d',
        destination: '/articles/dopex-essentials/dopex-essentials-atm-itm-otm',
        permanent: false,
      },
      {
        source: '/dopex-essentials-calls-and-puts-cc0abc58dd36',
        destination: '/articles/dopex-essentials/dopex-essentials-calls-and-puts',
        permanent: false,
      },
      {
        source: '/dopex-essentials-volatility-smiles-surfaces-239355da26f5',
        destination: '/articles/dopex-essentials/dopex-essentials-volatility-smiles-surfaces',
        permanent: false,
      },
      {
        source: '/dpx-bull-thesis-9c7fbcac1651',
        destination: '/articles/bull-theses/dpx-bull-thesis',
        permanent: false,
      },
      {
        source: '/essentials-213bd42d7923',
        destination: '/articles/dopex-essentials/dopex-essentials-what-are-options',
        permanent: false,
      },
      {
        source: '/introducing-dopex-an-all-around-efficient-options-protocol-13d7db711f05',
        destination: '/articles/introducing-dopex-an-all-round-efficient-options-protocol',
        permanent: false,
      },
      {
        source: '/articles/dopex-community-NFTs',
        destination: '/articles/introduction-series/dopex-community-NFTs',
        permanent: false,
      },
    ]
  },
})
