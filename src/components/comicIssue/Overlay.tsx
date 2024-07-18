import clsx from 'clsx'
import React from 'react'

type Props = {
  className?: string
}

export const Overlay: React.FC<Props> = ({ className = '' }) => (
  <div
    className={clsx(
      'overflow-hidden absolute h-full w-full bg-grey-500/5 bg-gradient-to-t from-grey-500/[.96] to-via-grey-500/75 via-60% to-grey-500/10 to-100%',
      className
    )}
  ></div>
)
