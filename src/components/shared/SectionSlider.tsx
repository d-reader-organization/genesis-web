'use client'

import React from 'react'
import { ControlledArrows } from './ControlledArrows'
import useEmblaCarousel from 'embla-carousel-react'

type Props = {
  //   actionHref: string
  slidesToScroll?: number
  title: string
} & React.PropsWithChildren

export const SectionSlider: React.FC<Props> = ({ children, slidesToScroll, title }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps', slidesToScroll })

  return (
    <div className='flex flex-col gap-4 md:gap-6'>
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
        <ControlledArrows onLeftClick={() => emblaApi?.scrollPrev()} onRightClick={() => emblaApi?.scrollNext()} />
      </div>
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex'>{children}</div>
      </div>
    </div>
  )
}
