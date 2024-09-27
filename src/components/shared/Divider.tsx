import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  text: string
}

const DividerWithText: React.FC<Props> = ({ text }) => (
  <div className='flex w-full items-center my-4 mx-0 before:flex-1 before:content-[""] before:p-[1px] before:bg-grey-300 before:my-2 before:mr-2 after:flex-1 after:content-[""] after:p-[1px] after:bg-grey-300 after:my-2 after:ml-2 text-base font-normal'>
    {text}
  </div>
)

const Divider: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => (
  <div className={cn('h-[1px] flex w-full bg-grey-300', className)} />
)

export { Divider, DividerWithText }
