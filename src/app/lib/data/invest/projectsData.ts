export type InterestProject = {
  image: string
  title: string
  slug: string
  stats: {
    likes: number
  }
  tags: string[]
}

export const highInterestProjects: InterestProject[] = [
  {
    image: '/assets/images/invest/mad-lads-cover.png',
    slug: 'mad-lads',
    stats: {
      likes: 0,
    },
    tags: ['Comic Series', 'Action', 'Superhero'],
    title: 'Mad Lads',
  },
  {
    image: '/assets/images/invest/bonk-cover.png',
    slug: 'bonk',
    stats: {
      likes: 0,
    },
    tags: ['Animated Series', 'Adventure', 'Sci-fi', 'Comedy'],
    title: 'Bonk',
  },
  {
    image: '/assets/images/invest/galactic-geckos-cover.png',
    slug: 'galactic-geckos',
    stats: {
      likes: 0,
    },
    tags: ['Comic Series', 'Adventure', 'Sci-fi', 'Superhero'],
    title: 'Galactic Geckos',
  },
]
