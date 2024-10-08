import React from 'react'
import { ControlledArrows } from './ControlledArrows'

type Props = {
  actionHref: string
  title: string
} & React.PropsWithChildren

export const Section: React.FC<Props> = ({ children, title }) => {
  return (
    <div className='flex flex-col gap-4 md:gap-10'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-8'>
          <h1 className='text-xl md:text-[32px] font-semibold leading-[20px] md:leading-8 tracking-[0.04px] md:tracking-[0.064px]'>
            {title}
          </h1>
          {/* <Link
            className='max-h-9 md:max-h-[42px] bg-grey-400 pl-4 py-3 pr-2 rounded-xl flex gap-1 items-center hover:brightness-125'
            href={actionHref}
          >
            <p className='text-xs leading-normal md:text-base font-medium text-[#AFB3BC]'>See all</p>
            <ChevronRight />
          </Link> */}
        </div>
        <ControlledArrows />
      </div>
      {children}
    </div>
  )
}
