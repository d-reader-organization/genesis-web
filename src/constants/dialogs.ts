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
    title: '',
    buttonLabel: 'Count me in!',
    items: [
      {
        icon: '🔎',
        title: 'Scout for talent',
        text: '',
      },
      {
        icon: '💵',
        title: 'Invest into best stories',
        text: '',
      },
      {
        icon: '▶️',
        title: `Join the movement`,
        text: '',
        video: 'https://www.youtube.com/embed/QjdGuCf6n08',
      },
    ],
  },
  {
    title: 'Did you know?!',
    buttonLabel: `OMG I'm blown away`,
    items: [
      {
        icon: '✍️',
        title: 'Big stories start small',
        text: 'Umbrella Academy, One Punch Man, One Piece, Walking Dead... all started as a comic or manga. Walking Dead generated $1B in revenue.',
      },
    ],
  },
]

export const PROJECT_INVEST_DIALOG_STEPS: DialogStep[] = [
  {
    title: 'What to do now?',
    buttonLabel: 'Got it!',
    items: [
      {
        icon: '🔎',
        title: 'Do your research on the page',
        text: '',
      },
      {
        icon: '✋',
        title: 'Express interest to invest',
        text: '',
      },
      {
        icon: '🪙',
        title: 'Wait for the story token offering',
        text: '',
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
        text: `On this page find details such as amount raised, number of backers, revenue, and days it took to profit.`,
      },
    ],
  },
]
