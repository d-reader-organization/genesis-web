'use client'

import React from 'react'
import { Arrow } from './Arrow'

type Props = {
  onLeftClick?: () => void
  onRightClick?: () => void
}

export const ControlledArrows: React.FC<Props> = ({ onLeftClick, onRightClick }) => {
  return (
    <div className='flex gap-2 items-center'>
      <Arrow arrowOrientation='LEFT' onClick={onLeftClick} />
      <Arrow arrowOrientation='RIGHT' onClick={onRightClick} />
    </div>
  )
}
