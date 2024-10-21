'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { CarouselSlide, CarouselTag } from '@/models/carousel/carouselSlide'
import { useIsMobile } from '@/hooks/useBreakpoints'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/shared/Badge'
import Link from 'next/link'
import { getSlideUrl } from '@/utils/helpers'
import { Text } from '../Text'

type Props = {
  slides: CarouselSlide[]
}

export const HeroCarousel: React.FC<Props> = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ stopOnMouseEnter: true })])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const isMobile = useIsMobile()

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
    <div className='flex justify-center items-center gap-4 relative bottom-8 px-4 md:px-6 max-h-4'>
      {slides.map((_, dotIndex) => (
        <button
          key={dotIndex}
          className={cn('transition-all duration-300 rounded-2xl w-full py-4')}
          onClick={() => emblaApi && emblaApi.scrollTo(dotIndex)}
        >
          <span
            className={cn('flex w-full', dotIndex === selectedIndex ? 'bg-yellow-500 h-[3px]' : 'bg-grey-200 h-[1px]')}
          ></span>
        </button>
      ))}
    </div>
  )

  return (
    <div>
      <div className='relative max-w-full md:max-w-[748px] carousel-height rounded-2xl shadow-[4px_4px_0px_0px_#000] max-md:rounded-t-none select-none'>
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='flex hover:brightness-110'>
            {slides.map((slide, index) => {
              const visitUrl = getSlideUrl(slide)
              return (
                <Link className='flex-[0_0_100%]' key={index} href={visitUrl ?? ''}>
                  <div className='overflow-hidden rounded-2xl max-md:rounded-t-none'>
                    <div className='p-0 relative w-full carousel-height'>
                      {visitUrl && (
                        <Image
                          src={slide.image}
                          alt={slide.title ?? ''}
                          fill
                          quality={isMobile ? 90 : 100}
                          priority={index === 0}
                          className='object-cover'
                          sizes='auto'
                        />
                      )}
                      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-90' />
                      <div className='h-full flex flex-col justify-between p-4 md:p-6'>
                        <TopSection tags={slide.tags ?? []} />
                        <div className='flex flex-col gap-4 relative mb-8'>
                          <Text as='h1' className='line-clamp-1 text-ellipsis' styleVariant='primary'>
                            {slide.title} + {slide.title}
                          </Text>
                          <p className='text-base md:text-xl lg:text-[22px] font-medium leading-normal md:leading-5 lg:leading-7 tracking-[0.2px] line-clamp-2 text-ellipsis'>
                            {slide.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      {dots}
    </div>
  )
}

type TopSectionProps = {
  tags: CarouselTag[]
}

const TopSection: React.FC<TopSectionProps> = ({ tags }) => (
  <div className='flex items-center gap-2'>
    {tags.map((tag) => (
      <Badge key={tag.title}>{tag.title}</Badge>
    ))}
  </div>
)
