import clsx from 'clsx'
import React from 'react'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  value: number
}

export const ProgressBar: React.FC<Props> = ({ className, value }) => (
  <div className={clsx('w-full bg-gray-400 rounded-full h-2.5', className)}>
    <div className={`bg-yellow-500 h-2.5 rounded-full w-[${value}%]`}></div>
  </div>
)
