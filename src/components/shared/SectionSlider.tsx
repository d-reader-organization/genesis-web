'use client'

import React from 'react'
import { ControlledArrows } from './ControlledArrows'
import useEmblaCarousel from 'embla-carousel-react'

type Props = {
  slidesToScroll?: number
  title: string
} & React.PropsWithChildren

export const SectionSlider: React.FC<Props> = ({ children, slidesToScroll, title }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps', slidesToScroll })

  return (
    <section className='flex flex-col gap-4 md:gap-6'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-8'>
          <h1 className='text-xl md:text-[32px] font-semibold leading-[20px] md:leading-8 tracking-[0.04px] md:tracking-[0.064px] font-obviouslyNarrow'>
            {title}
          </h1>
        </div>
        <ControlledArrows onLeftClick={() => emblaApi?.scrollPrev()} onRightClick={() => emblaApi?.scrollNext()} />
      </div>
      <div className='max-sm:flex overflow-hidden' ref={emblaRef}>
        <div className='flex w-full sm:w-[calc(100%+15px)] md:w-[calc(100%+23px)]'>{children}</div>
      </div>
    </section>
  )
}
