import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | FightSwap',
  defaultTitle: 'Game | FightSwap',
  description: 'Play different games on FightSwap, using CAKE and FightSwap NFTs',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@FightSwap',
    site: '@FightSwap',
  },
  openGraph: {
    title: '🥞 FightSwap - A next evolution DeFi exchange on BNB Smart Chain (BSC)',
    description: 'Play different games on FightSwap, using CAKE and FightSwap NFTs',
    images: [{ url: 'https://assets.pancakeswap.finance/web/og/v2/hero.jpg' }],
  },
}
