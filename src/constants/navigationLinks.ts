import { RoutePath } from '@/enums/routePath'
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
  disabled: boolean
  targetBlank: boolean
  href: string
  name: string
}

export const ESSENTIAL_LINKS: NavigationLink[] = [
  { href: '/', name: 'Home', isComingSoon: false, disabled: false, targetBlank: false },
  { href: RoutePath.Discover, name: 'Discover', isComingSoon: false, disabled: false, targetBlank: false },
  { href: RoutePath.Marketplace, name: 'Marketplace', isComingSoon: true, disabled: false, targetBlank: false },
  { href: RoutePath.Invest, name: 'Invest', isComingSoon: true, disabled: false, targetBlank: false },
]

export const MAIN_LINKS: NavigationLink[] = [
  { href: SUPPORT_LINK, name: 'Help center', isComingSoon: false, disabled: false, targetBlank: true },
  { href: RoutePath.FAQ, name: 'FAQ', isComingSoon: false, disabled: false, targetBlank: false },
  { href: LINKTREE_LINK, name: 'Linktree', isComingSoon: false, disabled: false, targetBlank: true },
  { href: D_PUBLISHER_LINK, name: 'Publish a comic', isComingSoon: false, disabled: false, targetBlank: true },
]

export const SOCIAL_LINKS: NavigationLink[] = [
  { href: TWITTER_LINK, name: '𝕏 / Twitter', isComingSoon: false, disabled: false, targetBlank: true },
  { href: DISCORD_LINK, name: 'Discord', isComingSoon: false, disabled: false, targetBlank: true },
  { href: INSTAGRAM_LINK, name: 'Instagram', isComingSoon: false, disabled: false, targetBlank: true },
  { href: TENSOR_LINK, name: 'Trade on Tensor', isComingSoon: false, disabled: false, targetBlank: true },
]
