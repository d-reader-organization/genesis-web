'use client'

import React from 'react'
import { Arrow } from './Arrow'

type Props = {
  some?: string
}

export const ControlledArrows: React.FC<Props> = () => {
  return (
    <div className='flex gap-2 items-center max-md:hidden'>
      <Arrow arrowOrientation='LEFT' onClick={() => {}} />
      <Arrow arrowOrientation='RIGHT' onClick={() => {}} />
    </div>
  )
}
