import { cn } from '@/lib/utils'
import React from 'react'

type Props = React.PropsWithChildren & React.HTMLAttributes<HTMLDivElement>

export const CardBorderWrapper: React.FC<Props> = ({ className, children }) => (
  <div className={cn('p-2 border border-grey-300 rounded-2xl size-full', className)}>{children}</div>
)
