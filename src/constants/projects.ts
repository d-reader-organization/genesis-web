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
    summary: string
    image?: string
  }[]
  fundingDetails: {
    pledgedAmount: number
    raiseGoal: number
    numberOfBackers: number
    daysLeft: number
  }
}

export const PROJECTS: Project[] = [
  {
    slug: 'the_recruits_3',
    title: 'The Recruits – comic series',
    subtitle: 'Celebrating the Degenerate Apes community',
    banner: '',
    creator: {
      name: 'Degen Apes',
      avatar: '',
    },
    tags: ['Comic Series', 'Action', 'Comedy'],
    facts: [
      {
        section: 'Overview',
        summary:
          'After a heist to capture the all powerful Matrix Opal goes badly wrong, Roach gets landed with a batch of naive new recruits & must hunt down the bastards that double-crossed her. From Emmy award-winning creators at StudioNX.',
        image: '',
      },
      {
        section: 'Team',
        summary:
          'Roach, Sparky, and Bubbles – a team of misfits that argue more over snacks than strategy. They might not be perfect, but together, they are unstoppable... most of the time.',
      },
      {
        section: 'Offering',
        summary:
          'Non-stop thrills, accidental explosions, and questionable decisions. Laughter guaranteed, survival optional!',
      },
      {
        section: 'Roadmap',
        summary:
          'Phase 1: Catch the bad guys. Phase 2: Get better snacks. Phase 3: Maybe save the world, or at least not destroy it.',
      },
    ],
    fundingDetails: {
      pledgedAmount: 2565170,
      raiseGoal: 3000000,
      numberOfBackers: 10213,
      daysLeft: 15,
    },
  },
  {
    title: 'Mad Lads',
    subtitle: 'A tale of chaos and mischief',
    banner: '',
    creator: {
      name: 'Mad Lad Studios',
      avatar: '',
    },
    tags: ['Comic Series', 'Action', 'Superhero'],
    facts: [
      {
        section: 'Overview',
        summary:
          'Follow the Mad Lads, a group of rogue adventurers who specialize in causing chaos. Whether it’s breaking into castles or confusing dragons, they somehow manage to survive... barely.',
        image: '',
      },
      {
        section: 'Team',
        summary:
          'The Mad Lads are led by their fearless (and completely unhinged) leader, Boon, who has a tendency to make decisions on impulse. His companions include Quirk, the magician who can barely control his spells, and Pug, a fighter who solves all problems with his fists... and sometimes his head.',
      },
      {
        section: 'Offering',
        summary:
          'Laughs, loot, and a lot of broken bones. Their adventures will leave you on the edge of your seat or rolling on the floor laughing.',
      },
      {
        section: 'Roadmap',
        summary:
          'Phase 1: Survive the next quest. Phase 2: Steal something valuable. Phase 3: Run for your life... again.',
      },
    ],
    fundingDetails: {
      pledgedAmount: 1840000,
      raiseGoal: 2500000,
      numberOfBackers: 8670,
      daysLeft: 20,
    },
  },
  {
    title: 'Bonk',
    subtitle: 'The wildest ride in the galaxy',
    banner: '',
    creator: {
      name: 'Bonkers Inc.',
      avatar: '',
    },
    tags: ['Animated Series', 'Adventure', 'Sci-fi', 'Comedy'],
    facts: [
      {
        section: 'Overview',
        summary:
          'Meet Bonk, a reckless space adventurer who doesn’t think before he acts. He’s always getting himself into insane situations, but somehow manages to escape... just barely. Join him as he hops from one crazy adventure to the next!',
        image: '',
      },
      {
        section: 'Team',
        summary:
          'Bonk and his quirky crew: Sizzle, the fast-talking, laser-gun wielding pilot, and Flux, a robot with a strange obsession for collecting junk. Together, they wreak havoc across the galaxy.',
      },
      {
        section: 'Offering',
        summary:
          'Explosions, fast ships, faster jokes, and plenty of "bonk" moments. If you like adrenaline-pumping sci-fi with a side of humor, Bonk is for you.',
      },
      {
        section: 'Roadmap',
        summary:
          'Phase 1: Find a treasure map. Phase 2: Accidentally blow something up. Phase 3: Make a daring escape while laughing at danger.',
      },
    ],
    fundingDetails: {
      pledgedAmount: 2200000,
      raiseGoal: 3500000,
      numberOfBackers: 9354,
      daysLeft: 10,
    },
  },
  {
    title: 'Galactic Geckos',
    subtitle: 'A space odyssey of epic proportions',
    banner: '',
    creator: {
      name: 'Gecko Studios',
      avatar: '',
    },
    tags: ['Comic Series', 'Adventure', 'Sci-fi', 'Superhero'],
    facts: [
      {
        section: 'Overview',
        summary:
          'The Galactic Geckos are an elite team of space mercenaries known for taking on the toughest jobs in the galaxy. With their cool demeanor and unmatched skills, they always get the job done... and look good while doing it.',
        image: '',
      },
      {
        section: 'Team',
        summary:
          'Led by Zog, the Gecko Commander, his team includes Sly, the sharp-tongued strategist, and Venom, the muscle with a mysterious past. Together, they navigate dangerous missions with style and precision.',
      },
      {
        section: 'Offering',
        summary:
          'Epic space battles, high-stakes missions, and a lot of slick gecko moves. Get ready for an adventure that’s out of this world!',
      },
      {
        section: 'Roadmap',
        summary:
          'Phase 1: Accept a dangerous mission. Phase 2: Fight off space pirates. Phase 3: Save the galaxy... and collect a huge bounty.',
      },
    ],
    fundingDetails: {
      pledgedAmount: 3000000,
      raiseGoal: 5000000,
      numberOfBackers: 12000,
      daysLeft: 30,
    },
  },
]
