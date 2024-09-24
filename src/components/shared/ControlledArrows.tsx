'use client'

import React from 'react'
import { Arrow } from './Arrow'

type Props = {
  some?: string
}

export const ControlledArrows: React.FC<Props> = () => {
  return (
    <div className='flex gap-2 items-center max-md:hidden'>
      <Arrow arrowOrientation='LEFT' onClick={() => console.log(`arrow left pressed`)} className='rotate-180' />
      <Arrow arrowOrientation='RIGHT' onClick={() => console.log(`arrow right pressed`)} />
    </div>
  )
}
