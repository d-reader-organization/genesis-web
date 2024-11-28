'use client'

import { RoutePath } from '@/enums/routePath'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { Hourglass } from 'lucide-react'
import { InvestSlide, SlideStats } from '@/app/lib/data/invest/carouselData'
import { CarouselDots } from '../shared/CarouselDots'

type Props = {
  slides: InvestSlide[]
}

const getSlideUrl = (slide: InvestSlide) => RoutePath.InvestDetails(slide.slug)

export const InvestCarousel: React.FC<Props> = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay({ stopOnMouseEnter: true })])
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    onSelect()
    emblaApi?.on('select', onSelect)
    return () => {
      emblaApi?.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className='flex flex-col gap-4 md:gap-6 w-full max-w-screen-xl'>
      <div
        className='relative flex h-[363px] md:h-[500px] items-center gap-2.5 flex-shrink-0 rounded-xl overflow-hidden shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)]'
        ref={emblaRef}
      >
        <div className='flex w-full'>
          {slides.map((slide, index) => {
            const visitUrl = getSlideUrl(slide)
            return (
              <Link className='flex-[0_0_100%] min-w-0 relative' key={index} href={visitUrl ?? ''}>
                <div className='overflow-hidden rounded-xl'>
                  <div className='p-0 relative carousel-height'>
                    {visitUrl && (
                      <Image
                        src={slide.image}
                        alt={slide.title ?? ''}
                        fill
                        quality={100}
                        priority={index === 0}
                        className='object-cover'
                      />
                    )}
                    <div className='absolute inset-0 bg-gradient-to-l from-transparent to-black'></div>
                    <div className='flex justify-between relative max-sm:h-full'>
                      <DetailsSection slide={slide} />
                      <div className='absolute right-0 max-h-9 bg-black bg-opacity-20 p-2 flex justify-center items-center gap-1 rounded-lg backdrop-blur-[25px] m-4'>
                        <span className='size-3 rounded-lg bg-white' />
                        <Paragraph text={slide.status} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      {<CarouselDots emblaApi={emblaApi} slides={slides} selectedIndex={selectedIndex} />}
    </div>
  )
}

const DetailsSection: React.FC<{ slide: InvestSlide }> = ({ slide }) => (
  <div className='h-full flex flex-col justify-end md:justify-between p-4 md:p-16'>
    <Image
      alt='logo'
      src={slide.logo}
      width={290}
      height={130}
      className='md:self-center md:self-start mb-4 w-40 md:w-[290px]'
    />
    <div className='flex flex-col justify-end gap-4 md:gap-6 max-w-[550px]'>
      <h1 className='text-xl md:text-[40px] leading-[20px] md:leading-[40px] font-semibold tracking-[0.08px] md:mb-4'>
        {slide.title}
      </h1>
      <InfoSection infos={slide.infos} />
      <Paragraph text={slide.subtitle ?? ''} />
      <Tags tags={slide.tags ?? []} />
    </div>
  </div>
)

const InfoSection: React.FC<{ infos: SlideStats[] }> = ({ infos }) => (
  <div className='flex gap-2 items-center text-grey-100'>
    {infos.map((info, index) => (
      <div className='flex items-center gap-2' key={info.text}>
        {info.text.includes('left') ? <Hourglass className='size-4 ' /> : null}
        <Paragraph text={info.text} />
        {index < infos.length - 1 && <span className='size-2 rounded-lg bg-grey-100' />}
      </div>
    ))}
  </div>
)

const Paragraph: React.FC<{ text: string }> = ({ text }) => (
  <p className='text-xs md:text-base font-medium leading-[normal] md:leading-[22.4px]'>{text}</p>
)

const Tags: React.FC<{ tags: { title: string }[] }> = ({ tags }) => {
  return (
    <div className='flex gap-2 items-center'>
      {tags.map((tag, index) => (
        <div
          className='p-2 max-h-5 md:max-h-7 bg-white bg-opacity-20 backdrop-blur-[25px] flex items-center justify-center rounded-lg text-[10px] md:text-base'
          key={`${tag}-${index}`}
        >
          {tag.title}
        </div>
      ))}
    </div>
  )
}
