import { cn } from '@/lib/utils'
import React from 'react'

type ButtonIconWrapperProps = React.HTMLAttributes<HTMLButtonElement> & React.PropsWithChildren

export const ButtonIconWrapper: React.FC<ButtonIconWrapperProps> = ({ className, onClick, children }) => (
  <button className={cn('rounded-xl bg-grey-300 p-4 flex items-center', className)} onClick={onClick}>
    {children}
  </button>
)
