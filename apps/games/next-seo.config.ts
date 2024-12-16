import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | SimbSwap',
  defaultTitle: 'Game | SimbSwap',
  description: 'Play different games on SimbSwap, using CAKE and SimbSwap NFTs',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@SimbSwap',
    site: '@SimbSwap',
  },
  openGraph: {
    title: '🥞 SimbSwap - A next evolution DeFi exchange on BNB Smart Chain (BSC)',
    description: 'Play different games on SimbSwap, using CAKE and SimbSwap NFTs',
    // images: [{ url: 'https://assets.pancakeswap.finance/web/og/v2/hero.jpg' }],
  },
}
