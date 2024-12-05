import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | HBSwap',
  defaultTitle: 'Game | HBSwap',
  description: 'Play different games on HBSwap, using CAKE and HBSwap NFTs',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@HBSwap',
    site: '@HBSwap',
  },
  openGraph: {
    title: '🥞 HBSwap - A next evolution DeFi exchange on BNB Smart Chain (BSC)',
    description: 'Play different games on HBSwap, using CAKE and HBSwap NFTs',
    // images: [{ url: 'https://assets.pancakeswap.finance/web/og/v2/hero.jpg' }],
  },
}
