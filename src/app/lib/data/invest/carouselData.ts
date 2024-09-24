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
    slug: 'the-recruits-2',
    image: '/assets/images/invest-carousel.jpeg',
    title: 'Slide 2',
    subtitle: 'Subtitle for Slide 2',
    status: 'LIVE',
    logo: 'https://d323dls9ny69nf.cloudfront.net/comics/the-recruits-1714399610806/logo-1714399886123.png',
    infos: [
      {
        text: 'by Degen Apes2',
      },
      {
        text: '1 day left',
      },
      {
        text: '97% funded',
      },
    ],
    tags: [
      {
        title: 'Crime',
      },
      {
        title: 'Comedy',
      },
    ],
  },
  {
    slug: 'the-recruits-3',
    title: 'Slide 3',
    subtitle: 'subtitle 3',
    image: '/assets/images/invest-carousel.jpeg',
    status: 'LIVE',
    logo: 'https://d323dls9ny69nf.cloudfront.net/comics/the-recruits-1714399610806/logo-1714399886123.png',
    infos: [
      {
        text: 'by Degen Apes',
      },
      {
        text: '5 days left',
      },
      {
        text: '85% funded',
      },
    ],
    tags: [
      {
        title: 'Adventure',
      },
      {
        title: 'Drama',
      },
    ],
  },
]
