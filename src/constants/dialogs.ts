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

export const DIALOG_STEPS: DialogStep[] = [
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
        text: `Support the creator on its journey, help with distribution, and reap the benefits as it generates revenue.`,
      },
      {
        icon: '📚',
        title: `You're the executive 🫵`,
        text: `YOU have the power to decide which story gets produced! It's time for original stories which will win over the world.`,
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
