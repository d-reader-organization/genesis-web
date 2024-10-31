import { cn } from '@/lib/utils'
import React from 'react'

type Props = React.HTMLAttributes<HTMLDivElement> & React.PropsWithChildren

export const Badge: React.FC<Props> = ({ className, children }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center  bg-white/20 backdrop-blur-[25px] px-2 py-1 rounded-lg w-fit h-7 sm:h-9',
        className
      )}
    >
      {children}
    </div>
  )
}
