'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { CarouselSlide } from '@/models/carousel/carouselSlide'
import { RoutePath } from '@/enums/routePath'
import { useIsMobile } from '@/hooks/useBreakpoints'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/shared/Badge'

const getSlideUrl = (slide: CarouselSlide) => {
  if (slide.comicIssueId) return RoutePath.ComicIssue(slide.comicIssueId)
  else if (slide.creatorSlug) return RoutePath.Creator(slide.creatorSlug)
  else if (slide.comicSlug) return RoutePath.Comic(slide.comicSlug)
  else return slide.externalLink
}

type Props = {
  carouselSlides: CarouselSlide[]
}

export const HeroCarousel: React.FC<Props> = ({ carouselSlides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])
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
    <div className='flex justify-center gap-4 relative -top-4'>
      {carouselSlides.map((_, dotIndex) => (
        <button
          key={dotIndex}
          className={cn(
            'h-1 w-10 transition-all duration-300 rounded-2xl',
            dotIndex === selectedIndex ? 'bg-yellow-500' : 'bg-grey-200'
          )}
          onClick={() => emblaApi && emblaApi.scrollTo(dotIndex)}
        />
      ))}
    </div>
  )

  const slides = carouselSlides
  return (
    <div>
      <div className='relative max-w-full md:max-w-[748px] carousel-height rounded-2xl shadow-[4px_4px_0px_0px_#000] max-md:rounded-t-none'>
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='flex'>
            {slides.map((slide, index) => {
              const visitUrl = getSlideUrl(slide)
              return (
                <div className='flex-[0_0_100%] min-w-0' key={index}>
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
                        />
                      )}
                      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-90' />
                      <div className='h-full flex flex-col justify-between p-4 md:p-6'>
                        <TopSection />
                        <div className='flex flex-col gap-4 relative mb-4'>
                          <p className='text-white line-clamp-1 text-ellipsis text-2xl md:text-5xl font-semibold'>
                            {slide.title}
                          </p>
                          <p className='text-base md:text-[22px] font-medium leading-normal md:leading-7 tracking-[0.2px] line-clamp-2 text-ellipsis'>
                            {slide.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {dots}
    </div>
  )
}

const TopSection: React.FC = () => (
  <div className='flex justify-between'>
    <Badge>
      <span className='size-[14px] rounded-full bg-green-500 mr-2 text-white' />
      Minting Live
    </Badge>
    <Badge>EP 1</Badge>
  </div>
)
