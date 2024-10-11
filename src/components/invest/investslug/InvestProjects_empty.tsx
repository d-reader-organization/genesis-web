type investProject = {
  header: {
    title: string
    subtitle: string
  }
  image: {
    url: string
  }
  author: {
    author: string
    image: string
    tags: string[]
  }
  facts: {
    section: string
    answer: string
    image?: string
  }[]
  invest: {
    current: number
    goal: number
    backers: number
    daysLeft: number
    estimated: number
  }
}

export const investProjects: investProject[] = [
  {
    header: {
      title: 'The Recruits – comic series',
      subtitle: 'Celebrating the Degenerate Apes community',
    },
    image: {
      url: '',
    },
    author: {
      author: 'Degen Apes',
      image: '',
      tags: ['Comic Series', 'Action', 'Comedy'],
    },
    facts: [
      {
        section: 'Overview',
        answer:
          'After a heist to capture the all powerful Matrix Opal goes badly wrong, Roach gets landed with a batch of naive new recruits & must hunt down the bastards that double-crossed her. From Emmy award-winning creators at StudioNX.',
        image: '',
      },
      {
        section: 'Team',
        answer:
          'Roach, Sparky, and Bubbles – a team of misfits that argue more over snacks than strategy. They might not be perfect, but together, they are unstoppable... most of the time.',
      },
      {
        section: 'Offering',
        answer:
          'Non-stop thrills, accidental explosions, and questionable decisions. Laughter guaranteed, survival optional!',
      },
      {
        section: 'Roadmap',
        answer:
          'Phase 1: Catch the bad guys. Phase 2: Get better snacks. Phase 3: Maybe save the world, or at least not destroy it.',
      },
    ],
    invest: {
      current: 2565170,
      goal: 3000000,
      backers: 10213,
      daysLeft: 15,
      estimated: 200,
    },
  },
  {
    header: {
      title: 'Mad Lads',
      subtitle: '',
    },
    image: {
      url: '',
    },
    author: {
      author: '',
      image: '',
      tags: ['Comic Series', 'Action', 'Superhero'],
    },
    facts: [],
    invest: {
      current: 0,
      goal: 0,
      backers: 0,
      daysLeft: 0,
      estimated: 0,
    },
  },
  {
    header: {
      title: 'Bonk',
      subtitle: '',
    },
    image: {
      url: '',
    },
    author: {
      author: '',
      image: '',
      tags: ['Animated Series', 'Adventure', 'Sci-fi', 'Comedy'],
    },
    facts: [],
    invest: {
      current: 0,
      goal: 0,
      backers: 0,
      daysLeft: 0,
      estimated: 0,
    },
  },
  {
    header: {
      title: 'Galactic Geckos',
      subtitle: '',
    },
    image: {
      url: '',
    },
    author: {
      author: '',
      image: '',
      tags: ['Comic Series','Adventure','Sci-fi','Superhero'],
    },
    facts: [],
    invest: {
      current: 0,
      goal: 0,
      backers: 0,
      daysLeft: 0,
      estimated: 0,
    },
  },
]
