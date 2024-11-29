import { RoutePath } from '@/enums/routePath'

export type Tab = {
  name: string
  url: string
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
