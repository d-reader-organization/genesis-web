import { cn } from '@/lib/utils'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  separator?: boolean
}

export const StatsList: React.FC<Props> = ({ separator, className, children, ...props }) => {
  const items = React.Children.toArray(children)

  return (
    <div
      className={cn(
        'flex flex-col gap-5 p-4 border rounded-xl border-grey-300 w-full h-min sm:max-w-[282px] sm:p-6',
        className
      )}
      {...props}
    >
      {items[0]}
      {separator && <div className='w-full h-[1px] bg-grey-300' />}
      {items.slice(1)}
    </div>
  )
}
