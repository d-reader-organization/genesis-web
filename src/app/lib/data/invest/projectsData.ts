export type Project = {
  logo: string
  roi: number
  raised: string
  backers: number
  description: string
  slug: string
  tooltipText: string
}

export const successfulProjects: Project[] = [
  {
    backers: 790,
    description: 'Payout processed 173 days after the offering closed.',
    logo: 'https://d323dls9ny69nf.cloudfront.net/comics/enter-the-tensorverse/logo-1704914830030.png',
    raised: '40,000',
    roi: 160,
    slug: 'enter-the-tensorverse',
    tooltipText:
      'This means that the issuer returned 100% of the initial investment  amount for each investor plus 20% of that initial investment. So if an  investor invested $100, the issuer returned $100+$20 which equals $120.',
  },
  {
    backers: 82,
    description: 'Payout processed 94 days after the offering closed.',
    logo: 'https://d323dls9ny69nf.cloudfront.net/comics/apt-323-collectors-edition-1713288491154/logo-1713964885062.png',
    raised: '4,000',
    roi: 60,
    slug: 'apt-323',
    tooltipText:
      'This means that the issuer returned 100% of the initial investment  amount for each investor plus 20% of that initial investment. So if an  investor invested $100, the issuer returned $100+$20 which equals $120.',
  },
  {
    backers: 274,
    description: 'Payout processed 164 days after the offering closed.',
    logo: 'https://d323dls9ny69nf.cloudfront.net/comics/dream-city/logo.png',
    raised: '10,000',
    roi: 40,
    slug: 'dream-city',
    tooltipText:
      'This means that the issuer returned 100% of the initial investment  amount for each investor plus 20% of that initial investment. So if an  investor invested $100, the issuer returned $100+$20 which equals $120.',
  },
  {
    backers: 581,
    description: 'Payout processed 180 days after the offering closed.',
    logo: 'https://d323dls9ny69nf.cloudfront.net/comics/liberty-square-originz/logo-1707999922532.png',
    raised: '20,000',
    roi: 140,
    slug: 'liberty-square-originz',
    tooltipText:
      'This means that the issuer returned 100% of the initial investment  amount for each investor plus 20% of that initial investment. So if an  investor invested $100, the issuer returned $100+$20 which equals $120.',
  },
]
