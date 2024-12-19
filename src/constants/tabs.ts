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

export const LIBRARY_PAGE_TABS: Tab[] = [
  {
    name: 'Owned',
    url: RoutePath.LibraryOwned,
  },
  {
    name: 'Favorites',
    url: RoutePath.LibraryFavorites,
  },
  {
    name: 'Creators',
    url: RoutePath.LibraryCreators,
  },
]

export const getCreatorPageTabs = (slug: string): Tab[] => [
  {
    name: 'Series',
    url: RoutePath.CreatorSeries(slug),
  },
  {
    name: 'Collectibles',
    url: RoutePath.CreatorCollectibles(slug),
    disabled: true,
  },
]
