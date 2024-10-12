type Project = {
  slug?: string
  title: string
  subtitle: string
  tags: string[]
  banner: string

  creator: {
    name: string
    avatar: string
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

export const investProjects: Project[] = [
  {
    slug: 'the_recruits_3',
    header: {
      title: 'The Recruits – comic series',
      subtitle: 'Celebrating the Degenerate Apes community',
    },
    banner: {
      url: '',
    },
    creator: {
      name: 'Degen Apes',
      avatar: '',
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
      subtitle: 'A tale of chaos and mischief',
    },
    banner: {
      url: '',
    },
    creator: {
      name: 'Mad Lad Studios',
      avatar: '',
      tags: ['Comic Series', 'Action', 'Superhero'],
    },
    facts: [
      {
        section: 'Overview',
        answer:
          'Follow the Mad Lads, a group of rogue adventurers who specialize in causing chaos. Whether it’s breaking into castles or confusing dragons, they somehow manage to survive... barely.',
        image: '',
      },
      {
        section: 'Team',
        answer:
          'The Mad Lads are led by their fearless (and completely unhinged) leader, Boon, who has a tendency to make decisions on impulse. His companions include Quirk, the magician who can barely control his spells, and Pug, a fighter who solves all problems with his fists... and sometimes his head.',
      },
      {
        section: 'Offering',
        answer:
          'Laughs, loot, and a lot of broken bones. Their adventures will leave you on the edge of your seat or rolling on the floor laughing.',
      },
      {
        section: 'Roadmap',
        answer:
          'Phase 1: Survive the next quest. Phase 2: Steal something valuable. Phase 3: Run for your life... again.',
      },
    ],
    invest: {
      current: 1840000,
      goal: 2500000,
      backers: 8670,
      daysLeft: 20,
      estimated: 180,
    },
  },
  {
    header: {
      title: 'Bonk',
      subtitle: 'The wildest ride in the galaxy',
    },
    banner: {
      url: '',
    },
    creator: {
      name: 'Bonkers Inc.',
      avatar: '',
      tags: ['Animated Series', 'Adventure', 'Sci-fi', 'Comedy'],
    },
    facts: [
      {
        section: 'Overview',
        answer:
          'Meet Bonk, a reckless space adventurer who doesn’t think before he acts. He’s always getting himself into insane situations, but somehow manages to escape... just barely. Join him as he hops from one crazy adventure to the next!',
        image: '',
      },
      {
        section: 'Team',
        answer:
          'Bonk and his quirky crew: Sizzle, the fast-talking, laser-gun wielding pilot, and Flux, a robot with a strange obsession for collecting junk. Together, they wreak havoc across the galaxy.',
      },
      {
        section: 'Offering',
        answer:
          'Explosions, fast ships, faster jokes, and plenty of "bonk" moments. If you like adrenaline-pumping sci-fi with a side of humor, Bonk is for you.',
      },
      {
        section: 'Roadmap',
        answer:
          'Phase 1: Find a treasure map. Phase 2: Accidentally blow something up. Phase 3: Make a daring escape while laughing at danger.',
      },
    ],
    invest: {
      current: 2200000,
      goal: 3500000,
      backers: 9354,
      daysLeft: 10,
      estimated: 160,
    },
  },
  {
    header: {
      title: 'Galactic Geckos',
      subtitle: 'A space odyssey of epic proportions',
    },
    banner: {
      url: '',
    },
    creator: {
      name: 'Gecko Studios',
      avatar: '',
      tags: ['Comic Series', 'Adventure', 'Sci-fi', 'Superhero'],
    },
    facts: [
      {
        section: 'Overview',
        answer:
          'The Galactic Geckos are an elite team of space mercenaries known for taking on the toughest jobs in the galaxy. With their cool demeanor and unmatched skills, they always get the job done... and look good while doing it.',
        image: '',
      },
      {
        section: 'Team',
        answer:
          'Led by Zog, the Gecko Commander, his team includes Sly, the sharp-tongued strategist, and Venom, the muscle with a mysterious past. Together, they navigate dangerous missions with style and precision.',
      },
      {
        section: 'Offering',
        answer:
          'Epic space battles, high-stakes missions, and a lot of slick gecko moves. Get ready for an adventure that’s out of this world!',
      },
      {
        section: 'Roadmap',
        answer:
          'Phase 1: Accept a dangerous mission. Phase 2: Fight off space pirates. Phase 3: Save the galaxy... and collect a huge bounty.',
      },
    ],
    invest: {
      current: 3000000,
      goal: 5000000,
      backers: 12000,
      daysLeft: 30,
      estimated: 220,
    },
  },
]
