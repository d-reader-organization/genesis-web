export type Tab = {
  slug: string
  name: string
  url: string
}

export const DISCOVER_PAGE_TABS: Tab[] = [
  {
    slug: 'comics',
    name: 'Comics',
    url: '/discover/comics',
  },
  {
    slug: 'issues',
    name: 'Episodes',
    url: '/discover/episodes',
  },
  {
    slug: 'creators',
    name: 'Creators',
    url: '/discover/creators',
  },
]
