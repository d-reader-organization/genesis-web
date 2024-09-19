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
    <div className='flex flex-col gap-10'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-8'>
          <h1 className='text-[32px] font-semibold tracking-[0.064px]'>{title}</h1>
          <Link
            className='max-h-[42px] bg-grey-400 pl-4 py-3 pr-2 rounded-xl flex gap-1 items-center hover:brightness-125'
            href={actionHref}
          >
            <p className='text-base font-medium text-[#AFB3BC]'>See all</p>
            <ChevronRight />
          </Link>
        </div>
        <ControlledArrows />
      </div>
      {children}
    </div>
  )
}
