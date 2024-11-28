import { ReactNode } from 'react'

export type DialogStep = {
  title: string
  items: DialogContentItem[]
  buttonLabel: string
}

export type DialogContentItem = {
  icon: ReactNode
  title: string
  text: string
  video?: string
}

export const INVEST_DISCLAIMER_DIALOG_STEPS: DialogStep[] = [
  {
    // title: 'Join the community changing entertainment!',
    title: 'Invest into breakthrough stories!',
    buttonLabel: 'Count me in!',
    items: [
      {
        icon: '🔎',
        title: 'Scout for talent',
        text: `Find a creator with an amazing story & undeniable talent.`,
      },
      {
        icon: '💵',
        title: 'Invest into breakthrough stories',
        text: `Support the creator on their journey, help with distribution, and reap the benefits as the story generates revenue.`,
      },
      {
        icon: '📚',
        title: `You're the executive 🫵`,
        text: `YOU have the power to decide which story gets produced! It's time for original stories to win over the world.`,
      },
    ],
  },
  {
    title: 'Did you know?!',
    buttonLabel: `OMG I'm blown away`,
    items: [
      {
        icon: '🤯',
        title: 'Walking Dead started as a comic',
        text: `What if you could've invested into Walking Dead before it generated 1 BILLION USD in revenue?`,
      },
      {
        icon: '😱',
        title: 'Hollywood executives are scared',
        text: `Now more than ever, Hollywood is afraid to take risk on new stories and commissions remakes of remakes.
There are 38 Godzilla and 13 Kong movies.`,
      },
      {
        icon: '✍️',
        title: 'Big stories start small',
        text: `Umbrella Academy, One Punch Man, One Piece, Spiderman... all bootstrapped as a comic or manga.`,
      },
    ],
  },
  {
    title: `We're here to make waves`,
    buttonLabel: `I'm ready to roll!`,
    items: [
      {
        icon: '▶️',
        title: 'Watch the video!',
        text: `Genesis is here to change the way new stories are built, and the change is only possible with you.`,
        video: 'https://www.youtube.com/embed/QjdGuCf6n08',
      },
      {
        icon: '⁉️',
        title: 'Got any questions?',
        text: `Find the FAQ at the bottom of the site, or connect with us via social links in the footer.`,
      },
    ],
  },
]

export const PROJECT_INVEST_DIALOG_STEPS: DialogStep[] = [
  {
    title: `Is this the story you're looking for?!`,
    buttonLabel: 'Got it!',
    items: [
      {
        icon: '🔎',
        title: 'Do your research',
        text: `On this page you can find all the project details: plot, roadmap, team, distribution plans, offering, ...`,
      },
      {
        icon: '✋',
        title: 'Express interest to invest',
        text: `If you like the story, 'express interest' to invest. Once sufficient investors opt in, fundraise will start.`,
      },
      {
        icon: '🪙',
        title: 'Story is tokenized',
        text: 'After the fundraise concludes, ownership of the story will be represented with a token.',
      },
    ],
  },
]

export const PROJECT_PAYOUT_DIALOG_STEPS: DialogStep[] = [
  {
    title: `Story payout details`,
    buttonLabel: 'Got it!',
    items: [
      {
        icon: '💰',
        title: 'This story is profitable',
        text: `Creators of this story and its investors have made profits.`,
      },
      {
        icon: '📄',
        title: 'Details available',
        text: `On this page you can find details of the payout such as amount raised, revenue generated, number of backers, and days it took to process the payout.`,
      },
    ],
  },
]
