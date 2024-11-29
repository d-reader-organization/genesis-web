import { RoutePath } from '@/enums/routePath'

export type Tab = {
  slug: string
  name: string
  url: string
}

export const DISCOVER_PAGE_TABS: Tab[] = [
  {
    slug: 'comics',
    name: 'Comics',
    url: RoutePath.DiscoverComics,
  },
  {
    slug: 'issues',
    name: 'Episodes',
    url: RoutePath.DiscoverComicIssues,
  },
  {
    slug: 'creators',
    name: 'Creators',
    url: RoutePath.DiscoverCreators,
  },
]
