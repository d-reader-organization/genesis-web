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
    image: '/assets/images/invest/mad-lads.png',
    slug: 'mad-lads',
    stats: {
      likes: 1023,
    },
    tags: ['Comic Series', 'Action', 'Superhero'],
    title: 'Mad Lads',
  },
  {
    image: '/assets/images/invest/bonk.png',
    slug: 'bonk',
    stats: {
      likes: 2278,
    },
    tags: ['Animated Series', 'Adventure', 'Sci-fi', 'Comedy'],
    title: 'Bonk',
  },
  {
    image: '/assets/images/invest/galactic-geckos.png',
    slug: 'galactic-geckos',
    stats: {
      likes: 820,
    },
    tags: ['Comic Series', 'Adventure', 'Sci-fi', 'Superhero'],
    title: 'Galactic Geckos',
  },
]
