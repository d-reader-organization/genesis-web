'use client'

import React from 'react'
import ChevronRight from 'public/assets/vector-icons/chevron-right.svg'

type ArrowOrientation = 'TOP' | 'RIGHT' | 'BOTTOM' | 'LEFT'

type Props = {
  arrowOrientation: ArrowOrientation
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const orientationClasses: Record<ArrowOrientation, string> = {
  BOTTOM: 'rotate-90',
  LEFT: 'rotate-180',
  RIGHT: '',
  TOP: '-rotate-90',
}

export const Arrow: React.FC<Props> = ({ arrowOrientation, onClick }) => {
  return (
    <button
      className='inline-flex justify-center items-center p-4 max-h-[50px] rounded-2xl bg-grey-400 hover:brightness-125 shadow-[2px_2px_0px_0px_#000]'
      onClick={onClick}
    >
      <ChevronRight className={orientationClasses[arrowOrientation]} />
    </button>
  )
}
