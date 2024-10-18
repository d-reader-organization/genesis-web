export type ProjectMetadata = {
  slug: string
  title: string
  subtitle: string
  images: ProjectImages
  tags: string[]
}

export type ProjectImages = {
  banner: string
  cover: string
  logo: string
}

export type CreatorMetadata = {
  name: string
  avatar: string
}

export type ProjectInfo = {
  section: string
  text: string
  image?: string
}[]

export type FundingInfo = {
  pledgedAmount: number
  raiseGoal: number
  numberOfBackers: number
  daysLeft: number
}

export type PayoutInfo = {
  roiPercentage: number
  daysForRoi: number
  description: string
}

export type Project = {
  metadata: ProjectMetadata
  creator: CreatorMetadata
  projectInfo: ProjectInfo
  fundingInfo: FundingInfo
  payoutInfo?: PayoutInfo
}

export const PROJECTS: Project[] = [
  {
    metadata: {
      slug: 'the-recruits',
      title: 'The Recruits – comic series',
      subtitle: 'Celebrating the Degenerate Apes community',
      tags: ['Action', 'Comedy'],
      images: {
        banner: 'https://d323dls9ny69nf.cloudfront.net/comics/the-recruits-1714399610806/banner-1714399885999.jpg',
        cover: 'https://d323dls9ny69nf.cloudfront.net/comics/the-recruits-1714399610806/cover-1714399885808.jpg',
        logo: 'https://d323dls9ny69nf.cloudfront.net/comics/the-recruits-1714399610806/logo-1714399886123.png',
      },
    },
    creator: {
      name: 'DegenApes',
      avatar: 'https://d323dls9ny69nf.cloudfront.net/creators/degen-apes-1714396919823/avatar-1714397500055.jpg',
    },
    projectInfo: [
      {
        section: 'Overview',
        text: 'The Recruits is a badass, fun-filled adventure story, about a ragtag group of rebels who battle the corrupt forces of Ape City. Led by a gun-toting, foul mouthed kamikaze Drop Bear called Roach and a paranoid weed smoking chief, these degens of fortune are hellbent on bringing justice to all the criminals, bent politicians and super villains that plague their city!',
        image: '/assets/images/invest/the-recruits-details-overview.png',
      },
      {
        section: 'Team',
        text: 'Roach, Sparky, and Bubbles – a team of misfits that argue more over snacks than strategy. They might not be perfect, but together, they are unstoppable... most of the time.',
      },
      {
        section: 'Offering',
        text: 'Non-stop thrills, accidental explosions, and questionable decisions. Laughter guaranteed, survival optional!',
      },
      {
        section: 'Roadmap',
        text: 'Phase 1: Catch the bad guys. Phase 2: Get better snacks. Phase 3: Maybe save the world, or at least not destroy it.',
      },
    ],
    fundingInfo: {
      pledgedAmount: 2565170,
      raiseGoal: 3000000,
      numberOfBackers: 10213,
      daysLeft: 15,
    },
  },
  {
    metadata: {
      slug: 'mad-lads',
      title: 'Mad Lads',
      subtitle: 'A tale of chaos and mischief',
      tags: ['Comic Series', 'Action', 'Superhero'],
      images: {
        banner: '/assets/images/invest/mad-lads-banner.png',
        cover: '/assets/images/invest/mad-lads-cover.png',
        logo: '/assets/images/invest/mad-king-logo.png',
      },
    },
    creator: {
      name: 'Mad King',
      avatar: '/assets/images/invest/the-recruits-avatar.png',
    },
    projectInfo: [
      {
        section: 'Overview',
        text: 'Follow the Mad Lads, a group of rogue adventurers who specialize in causing chaos. Whether it’s breaking into castles or confusing dragons, they somehow manage to survive... barely.',
        image: '',
      },
      {
        section: 'Team',
        text: 'The Mad Lads are led by their fearless (and completely unhinged) leader, Boon, who has a tendency to make decisions on impulse. His companions include Quirk, the magician who can barely control his spells, and Pug, a fighter who solves all problems with his fists... and sometimes his head.',
      },
      {
        section: 'Offering',
        text: 'Laughs, loot, and a lot of broken bones. Their adventures will leave you on the edge of your seat or rolling on the floor laughing.',
      },
      {
        section: 'Roadmap',
        text: 'Phase 1: Survive the next quest. Phase 2: Steal something valuable. Phase 3: Run for your life... again.',
      },
    ],
    fundingInfo: {
      pledgedAmount: 1840000,
      raiseGoal: 2500000,
      numberOfBackers: 8670,
      daysLeft: 20,
    },
  },
  {
    metadata: {
      slug: 'bonk',
      title: 'Bonk',
      subtitle: 'The wildest ride in the galaxy',
      tags: ['Animated Series', 'Adventure', 'Sci-fi', 'Comedy'],
      images: {
        banner: '/assets/images/invest/bonk-banner.png',
        cover: '/assets/images/invest/bonk-cover.png',
        logo: '/assets/images/invest/transparent_800x450.png',
      },
    },
    creator: {
      name: 'Bonkers Inc.',
      avatar: '/assets/images/invest/the-recruits-avatar.png',
    },
    projectInfo: [
      {
        section: 'Overview',
        text: 'Meet Bonk, a reckless space adventurer who doesn’t think before he acts. He’s always getting himself into insane situations, but somehow manages to escape... just barely. Join him as he hops from one crazy adventure to the next!',
        image: '',
      },
      {
        section: 'Team',
        text: 'Bonk and his quirky crew: Sizzle, the fast-talking, laser-gun wielding pilot, and Flux, a robot with a strange obsession for collecting junk. Together, they wreak havoc across the galaxy.',
      },
      {
        section: 'Offering',
        text: 'Explosions, fast ships, faster jokes, and plenty of "bonk" moments. If you like adrenaline-pumping sci-fi with a side of humor, Bonk is for you.',
      },
      {
        section: 'Roadmap',
        text: 'Phase 1: Find a treasure map. Phase 2: Accidentally blow something up. Phase 3: Make a daring escape while laughing at danger.',
      },
    ],
    fundingInfo: {
      pledgedAmount: 2200000,
      raiseGoal: 3500000,
      numberOfBackers: 9354,
      daysLeft: 10,
    },
  },
  {
    metadata: {
      slug: 'galactic-geckos',
      title: 'Galactic Geckos',
      subtitle: 'A space odyssey of epic proportions',
      tags: ['Comic Series', 'Adventure', 'Sci-fi', 'Superhero'],
      images: {
        banner: '/assets/images/invest/galactic-geckos-thumbnail.png',
        cover: '/assets/images/invest/galactic-geckos-cover.png',
        logo: '/assets/images/invest/galactic-geckos-logo.png',
      },
    },
    creator: {
      name: 'Gecko Studios',
      avatar: '/assets/images/invest/the-recruits-avatar.png',
    },
    projectInfo: [
      {
        section: 'Overview',
        text: 'The Galactic Geckos are an elite team of space mercenaries known for taking on the toughest jobs in the galaxy. With their cool demeanor and unmatched skills, they always get the job done... and look good while doing it.',
        image: '',
      },
      {
        section: 'Team',
        text: 'Led by Zog, the Gecko Commander, his team includes Sly, the sharp-tongued strategist, and Venom, the muscle with a mysterious past. Together, they navigate dangerous missions with style and precision.',
      },
      {
        section: 'Offering',
        text: 'Epic space battles, high-stakes missions, and a lot of slick gecko moves. Get ready for an adventure that’s out of this world!',
      },
      {
        section: 'Roadmap',
        text: 'Phase 1: Accept a dangerous mission. Phase 2: Fight off space pirates. Phase 3: Save the galaxy... and collect a huge bounty.',
      },
    ],
    fundingInfo: {
      pledgedAmount: 3000000,
      raiseGoal: 5000000,
      numberOfBackers: 12000,
      daysLeft: 30,
    },
  },
  {
    metadata: {
      slug: 'enter-the-tensorverse',
      title: 'Enter the Tensorverse',
      subtitle: 'Survive or Die: The First Adventure in Tensor City',
      tags: ['Action', 'Adventure', 'Sci-fi'],
      images: {
        banner: 'https://d323dls9ny69nf.cloudfront.net/comics/enter-the-tensorverse/banner-1704914829715.png',
        cover: 'https://d323dls9ny69nf.cloudfront.net/comics/enter-the-tensorverse/cover-1704914829469.jpg',
        logo: 'https://d323dls9ny69nf.cloudfront.net/comics/enter-the-tensorverse/logo-1704914830030.png',
      },
    },
    creator: {
      name: 'Tensor',
      avatar: 'https://d323dls9ny69nf.cloudfront.net/creators/tensor/avatar-1704912927423.jpg',
    },
    projectInfo: [
      {
        section: 'Overview',
        text: 'Enter the Tensorverse follows a thrilling sci-fi journey with unexpected turns and futuristic battles.',
      },
      {
        section: 'Team',
        text: 'The story is crafted by a talented group of artists and writers, bringing a unique sci-fi adventure to life.',
      },
      {
        section: 'Offering',
        text: 'Expect futuristic action, complex characters, and deep storytelling that pushes the boundaries of imagination.',
      },
      {
        section: 'Roadmap',
        text: 'Phase 1: Concept art and story development. Phase 2: Launch the first volume. Phase 3: Expand the universe with new adventures.',
      },
    ],
    fundingInfo: {
      pledgedAmount: 40000,
      raiseGoal: 50000,
      numberOfBackers: 790,
      daysLeft: 0,
    },
    payoutInfo: {
      roiPercentage: 160,
      daysForRoi: 20,
      description:
        "Surviving in Tensor City is damn near impossible. When a group of Raiders follow some leaked alpha to an abandoned building, they'll learn just how do-or-die the space truly is. Emphasis on the DIE part. Because, shit's about to go down in this action-packed, sci-fi adventure -- the first ever story set in the Tensorian universe!",
    },
  },
  {
    metadata: {
      slug: 'apt-323',
      title: 'Apt 323',
      subtitle: 'Chaos, Parties, and Eviction: Life at Apartment 323',
      tags: ['Comedy'],
      images: {
        banner:
          'https://d323dls9ny69nf.cloudfront.net/comics/apt-323-collectors-edition-1713288491154/banner-1713964884959.png',
        cover:
          'https://d323dls9ny69nf.cloudfront.net/comics/apt-323-collectors-edition-1713288491154/issues/collectors-edition-1713289013265/cover-common-1713289076229.jpg',
        logo: 'https://d323dls9ny69nf.cloudfront.net/comics/apt-323-collectors-edition-1713288491154/logo-1713964885062.png',
      },
    },
    creator: {
      name: 'StudioNX',
      avatar: 'https://d323dls9ny69nf.cloudfront.net/creators/studio-nx/avatar-1697021201713.png',
    },
    projectInfo: [
      {
        section: 'Overview',
        text: 'Apt 323 is a spine-chilling tale that dives into the mysteries lurking behind closed doors.',
      },
      {
        section: 'Team',
        text: 'Brought to life by a dedicated team of horror enthusiasts who specialize in creating thrilling narratives.',
      },
      {
        section: 'Offering',
        text: 'If you enjoy unraveling mysteries and experiencing a sense of dread, Apt 323 is the comic for you.',
      },
      {
        section: 'Roadmap',
        text: 'Phase 1: Release of the first issue. Phase 2: Launch interactive online content. Phase 3: Announce follow-up story arcs.',
      },
    ],
    fundingInfo: {
      pledgedAmount: 4000,
      raiseGoal: 5000,
      numberOfBackers: 82,
      daysLeft: 0,
    },
    payoutInfo: {
      roiPercentage: 60,
      daysForRoi: 55,
      description:
        'Join college dropouts Breeson & Jenkins, the dumbest degens in town, on their whacky adventures at Apartment 323. Every day they do super-important stuff like eating junk food, getting wasted, throwing parties and trying to hold down a job while constantly receiving eviction threats from the stoopid landlord.',
    },
  },
  {
    metadata: {
      slug: 'dream-city',
      title: 'Dream City',
      subtitle: 'Tales of Love, Mystery, and Sci-Fi in Dream City',
      tags: ['Action', 'Adventure', 'Romance', 'Comedy', 'Sci-fi', 'Fantasy', 'Crime'],
      images: {
        banner: 'https://d323dls9ny69nf.cloudfront.net/comics/dream-city/banner.png',
        cover: 'https://d323dls9ny69nf.cloudfront.net/comics/dream-city/cover.png',
        logo: 'https://d323dls9ny69nf.cloudfront.net/comics/dream-city/logo.png',
      },
    },
    creator: {
      name: 'Brandon Mullins',
      avatar: 'https://d323dls9ny69nf.cloudfront.net/creators/brandon-mullins/avatar-1695669858324.jpg',
    },
    projectInfo: [
      {
        section: 'Overview',
        text: 'Dream City is a fantastical journey through a world where reality and imagination collide.',
      },
      {
        section: 'Team',
        text: 'A creative group of fantasy writers and illustrators have joined forces to build this whimsical world.',
      },
      {
        section: 'Offering',
        text: 'Dive into a story that defies the ordinary, blending dreams and adventures into a visual spectacle.',
      },
      {
        section: 'Roadmap',
        text: 'Phase 1: Initial storyboards and character designs. Phase 2: Full launch of the comic series. Phase 3: Fan engagement and special editions.',
      },
    ],
    fundingInfo: {
      pledgedAmount: 10000,
      raiseGoal: 15000,
      numberOfBackers: 274,
      daysLeft: 0,
    },
    payoutInfo: {
      roiPercentage: 40,
      daysForRoi: 15,
      description:
        "Dive into Dream City's vibrant tapestry! This short comic anthology weaves tales of love, mystery, sci-fi, and more, all set against the backdrop of the dystopian metropolis of Dream City. Explore many genres in one captivating collection!",
    },
  },
  {
    metadata: {
      slug: 'liberty-square-originz',
      title: 'Liberty Square Originz',
      subtitle: "Surviving a Dystopian Wasteland: The Syndicate's Fight for Freedom",
      tags: ['Fantasy'],
      images: {
        banner: 'https://d323dls9ny69nf.cloudfront.net/comics/liberty-square-originz/banner-1707999922284.png',
        cover:
          'https://d323dls9ny69nf.cloudfront.net/comics/liberty-square-originz/issues/embers/cover-common-1708002664074.png',
        logo: 'https://d323dls9ny69nf.cloudfront.net/comics/liberty-square-originz/logo-1707999922532.png',
      },
    },
    creator: {
      name: 'Liberty Square',
      avatar: 'https://d323dls9ny69nf.cloudfront.net/creators/liberty-square/avatar-1707998020754.png',
    },
    projectInfo: [
      {
        section: 'Overview',
        text: 'Liberty Square Originz dives deep into the lives of vigilantes fighting for justice in a troubled city.',
      },
      {
        section: 'Team',
        text: 'The project is developed by action and drama storytellers dedicated to showcasing gripping narratives.',
      },
      {
        section: 'Offering',
        text: 'Experience an action-packed story with heart-pounding moments and complex characters that challenge the norm.',
      },
      {
        section: 'Roadmap',
        text: 'Phase 1: Initial character sketches and plot outline. Phase 2: Pilot issue release. Phase 3: Community expansion and series development.',
      },
    ],
    fundingInfo: {
      pledgedAmount: 20000,
      raiseGoal: 30000,
      numberOfBackers: 581,
      daysLeft: 0,
    },
    payoutInfo: {
      roiPercentage: 140,
      daysForRoi: 78,
      description:
        'After the conclusion of "The Plague Wars," Liberty has dwindled to a mere shell of its former self. Under the rule of B.E.G., the once thriving metropolis has deteriorated into a dystopian wasteland, where corruption thrives and hope has faded. This speculative fiction series follows the lives of a group of individuals, collectively known as The Syndicate, displaced by the war and now navigating the challenges of this new world. Through the dark & shadowy streets and the barren outskirts, each character confronts their own struggles, their stories intertwining as they reunite, their bonds strengthened by adversity, to confront the challenges of the present while facing the demons of their past. Staring down the reality of extinction, they come to understand that their battle extends beyond challenging the oppressive regime to confronting their own inner conflicts. "Originz" offers a grounded exploration of resilience amidst adversity where every step forward carries the weight of history.',
    },
  },
]
