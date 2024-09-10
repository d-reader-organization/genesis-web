import React from 'react'
import Link from 'next/link'
import ChevronRight from 'public/assets/vector-icons/chevron-right.svg'
import { ControlledArrows } from './ControlledArrows'

type Props = {
  actionHref: string
  title: string
} & React.PropsWithChildren

export const Section: React.FC<Props> = ({ actionHref, children, title }) => {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-8'>
          <p className='text-xl md:text-[28px] font-semibold tracking-wide'>{title}</p>
          <Link
            className='max-h-[50px] bg-grey-400 p-4 pr-2 rounded-2xl flex gap-1 items-center hover:brightness-125'
            href={actionHref}
          >
            <p className='text-base md:text-lg tracking-wide font-medium text-[#AFB3BC]'>See all</p>
            <ChevronRight />
          </Link>
        </div>
        <ControlledArrows />
      </div>
      {children}
    </div>
  )
}
