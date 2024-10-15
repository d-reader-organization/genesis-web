export type SlideStats = {
  text: string
}

export type InvestSlide = {
  slug: string
  image: string
  title: string
  logo: string
  subtitle: string
  status: string
  infos: SlideStats[]
  tags: { title: string }[]
}

export const investSlides: InvestSlide[] = [
  {
    slug: 'the-recruits',
    image: '/assets/images/invest-carousel.jpeg',
    title: 'The Recruits - comic series',
    subtitle:
      'After a heist to capture the all powerful Matrix Opal goes badly wrong, Roach gets landed with a batch...',
    status: 'LIVE',
    logo: 'https://d323dls9ny69nf.cloudfront.net/comics/the-recruits-1714399610806/logo-1714399886123.png',
    infos: [
      {
        text: 'by Degen Apes',
      },
      {
        text: '15 days left',
      },
      {
        text: '80% funded',
      },
    ],
    tags: [
      {
        title: 'Action',
      },
      {
        title: 'Comedy',
      },
    ],
  },
  {
    slug: 'galactic-geckos',
    image: '/assets/images/invest/galactic-geckos.png',
    title: 'Galactic Geckos',
    subtitle: 'Lord of the Ring meets geckos - in space',
    status: 'LIVE SOON',
    logo: '/assets/images/invest/transparent_800x450.png',
    infos: [
      {
        text: 'by GGSG',
      },
      {
        text: 'in 14 days',
      },
      {
        text: '0% funded',
      },
    ],
    tags: [
      {
        title: 'Comic Series',
      },
      {
        title: 'Adventure',
      },
      {
        title: 'Sci-fi',
      },
      {
        title: 'Superhero'
      }
    ],
  },
  {
    slug: 'mad-lads',
    title: 'Mad Lads',
    subtitle: 'The Mad King has focking risen!',
    image: '/assets/images/invest/mad-lads-banner.png',
    status: 'LIVE SOON',
    logo: '/assets/images/invest/transparent_800x450.png',
    infos: [
      {
        text: 'by Mad King',
      },
      {
        text: 'in 28 days',
      },
      {
        text: '0% funded',
      },
    ],
    tags: [
      {
        title: 'Comic Series',
      },
      {
        title: 'Action',
      },
      {
        title: 'Superhero',
      },
    ],
  },
]
