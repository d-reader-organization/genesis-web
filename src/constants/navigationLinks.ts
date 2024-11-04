import {
  SUPPORT_LINK,
  LINKTREE_LINK,
  D_PUBLISHER_LINK,
  TWITTER_LINK,
  DISCORD_LINK,
  INSTAGRAM_LINK,
  TENSOR_LINK,
} from './general'

export type NavigationLink = {
  isComingSoon: boolean
  isClickable: boolean
  targetBlank: boolean
  href: string
  name: string
}

export const ESSENTIAL_LINKS: NavigationLink[] = [
  { href: '/discover', name: 'Discover', isComingSoon: true, isClickable: true, targetBlank: false },
  { href: '/marketplace', name: 'Marketplace', isComingSoon: true, isClickable: true, targetBlank: false },
  { href: '/invest', name: 'Invest', isComingSoon: true, isClickable: false, targetBlank: false },
]

export const MAIN_LINKS: NavigationLink[] = [
  { href: SUPPORT_LINK, name: 'Help center', isComingSoon: false, isClickable: true, targetBlank: true },
  { href: '/faq', name: 'FAQ', isComingSoon: false, isClickable: true, targetBlank: false },
  { href: LINKTREE_LINK, name: 'Linktree', isComingSoon: false, isClickable: true, targetBlank: true },
  { href: D_PUBLISHER_LINK, name: 'Publish a comic', isComingSoon: false, isClickable: true, targetBlank: true },
]

export const SOCIAL_LINKS: NavigationLink[] = [
  { href: TWITTER_LINK, name: '𝕏 / Twitter', isComingSoon: false, isClickable: true, targetBlank: true },
  { href: DISCORD_LINK, name: 'Discord', isComingSoon: false, isClickable: true, targetBlank: true },
  { href: INSTAGRAM_LINK, name: 'Instagram', isComingSoon: false, isClickable: true, targetBlank: true },
  { href: TENSOR_LINK, name: 'Trade on Tensor', isComingSoon: false, isClickable: true, targetBlank: true },
]
