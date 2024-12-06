import { RoutePath } from '@/enums/routePath'

export type Tab = {
  name: string
  url: string
  disabled?: boolean
}

export const DISCOVER_PAGE_TABS: Tab[] = [
  {
    name: 'Comics',
    url: RoutePath.DiscoverComics,
  },
  {
    name: 'Episodes',
    url: RoutePath.DiscoverComicIssues,
  },
  {
    name: 'Creators',
    url: RoutePath.DiscoverCreators,
  },
]

export const getCreatorPageTabs = (slug: string): Tab[] => [
  {
    name: 'Releases',
    url: RoutePath.CreatorReleases(slug),
  },
  {
    name: 'Collectibles',
    url: RoutePath.CreatorCollectibles(slug),
    disabled: true,
  },
]