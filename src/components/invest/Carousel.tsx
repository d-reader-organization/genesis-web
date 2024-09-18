'use client'

import { RoutePath } from '@/enums/routePath'
import { cn } from '@/lib/utils'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import RecruitsLogo from 'public/assets/vector-icons/recruits.svg'
import { Hourglass } from 'lucide-react'
import { InvestSlide, SlideStats } from '@/app/lib/data/carouselData'

type Props = {
  slides: InvestSlide[]
}

const getSlideUrl = (slide: InvestSlide) => RoutePath.InvestDetails(slide.slug)

export const InvestCarousel: React.FC<Props> = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ stopOnMouseEnter: true })])
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

  const dots = (
    <div className='flex justify-center items-center gap-4 px-4 md:px-6 max-h-4'>
      {slides.map((_, dotIndex) => (
        <button
          key={dotIndex}
          className={cn('transition-all duration-300 rounded-2xl w-full max-w-[90px] py-4')}
          onClick={() => emblaApi && emblaApi.scrollTo(dotIndex)}
        >
          <span
            className={cn(
              'flex w-full',
              dotIndex === selectedIndex ? 'bg-green-genesis h-[3px]' : 'bg-grey-200 h-[1px]'
            )}
          ></span>
        </button>
      ))}
    </div>
  )

  return (
    <div className='flex flex-col gap-6 w-full max-w-screen-xl'>
      <div
        className='relative flex h-[500px] items-center gap-2.5 flex-shrink-0 rounded-xl overflow-hidden shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)]'
        ref={emblaRef}
      >
        <div className='flex w-full'>
          {slides.map((slide, index) => {
            const visitUrl = getSlideUrl(slide)
            return (
              <Link className='flex-[0_0_100%] min-w-0 relative' key={index} href={visitUrl ?? ''}>
                <div className='overflow-hidden rounded-xl max-md:rounded-t-none'>
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
                    <DetailsSection slide={slide} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      {dots}
    </div>
  )
}

const DetailsSection: React.FC<{ slide: InvestSlide }> = ({ slide }) => (
  <div className='h-full flex flex-col justify-between p-4 md:p-16 relative'>
    <RecruitsLogo className='h-full' />
    <div className='flex flex-col gap-6 max-w-[550px]'>
      <h1 className='text-[40px] font-semibold tracking-[0.08px] mb-4'>{slide.title}</h1>
      <StatsSection stats={slide.stats} />
      <Paragraph text={slide.subtitle ?? ''} />
      <Tags tags={slide.tags ?? []} />
    </div>
  </div>
)

const StatsSection: React.FC<{ stats: SlideStats[] }> = ({ stats }) => (
  <div className='flex gap-2 items-center text-grey-100'>
    {stats.map((stat, index) => (
      <div className='flex items-center gap-2' key={stat.text}>
        {stat.text.includes('left') ? <Hourglass className='size-4 ' /> : null}
        <Paragraph text={stat.text} />
        {index < stats.length - 1 && <span className='size-2 rounded-lg bg-grey-100' />}
      </div>
    ))}
  </div>
)

const Paragraph: React.FC<{ text: string }> = ({ text }) => (
  <p className='text-base font-medium leading-[22.4px]'>{text}</p>
)

const Tags: React.FC<{ tags: { title: string }[] }> = ({ tags }) => {
  return (
    <div className='flex gap-2 items-center'>
      {tags.map((tag, index) => (
        <div
          className='p-2 max-h-7 bg-white bg-opacity-20 backdrop-blur-[25px] flex items-center justify-center rounded-lg'
          key={`${tag}-${index}`}
        >
          {tag.title}
        </div>
      ))}
    </div>
  )
}
