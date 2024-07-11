'use client'

import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from './Carousel'
import Image from 'next/image'
import { CarouselSlide } from '@/models/carousel/carouselSlide'
import { RoutePath } from '@/enums/routePath'
import clsx from 'clsx'
import LogoIcon from 'public/assets/vector-icons/logo.svg'
import { ButtonLink } from '../Button'
import { Text } from '../Text'
import Autoplay from 'embla-carousel-autoplay'
import { useIsMobile } from '@/hooks/useBreakpoints'

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
  const isMobile = useIsMobile()

  return (
    <Carousel
      className='w-full portrait:h-[60vh] landscape:h-[84vh] max-h-[780px] mt-0 md:mt-24 mb-6'
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 5000 })]}
    >
      <CarouselContent>
        {carouselSlides.map((slide, index) => {
          const visitUrl = getSlideUrl(slide)
          return (
            <CarouselItem
              className='relative z-10  portrait:h-[60vh] landscape:h-[84vh] max-h-[780px] basis-full md:basis-[92%]'
              key={slide.id}
            >
              {visitUrl && (
                <Image
                  src={slide.image}
                  alt={slide.title ?? ''}
                  fill
                  quality={isMobile ? 90 : 100}
                  className={clsx('-z-[1] object-cover max-h-full select-none', !isMobile && 'px-0 py-2 rounded-lg')}
                  priority={index === 0}
                  fetchPriority={index === 0 ? 'high' : 'low'}
                />
              )}
              <div className='text-left absolute bottom-[10%] left-[16%] transition-[translateX(-50%)]'>
                {visitUrl && (
                  <ButtonLink
                    className='bg-important-color text-grey-600 py-2 px-4 shadow-3 min-w-[unset] max-w-fit'
                    href={visitUrl}
                    target={!!slide.externalLink ? '_blank' : undefined}
                  >
                    <LogoIcon className='pr-2' /> Visit
                  </ButtonLink>
                )}
                <Text as='h2' className='bold mt-4 mx-0 mb-1 text-2xl md:text-3xl'>
                  {slide.title}
                </Text>
                <Text as='p' className='md:text-lg sm:text-base text-sm leading-5'>
                  {slide.subtitle}
                </Text>
              </div>

              <div className='absolute left-0 right-0 top-auto bottom-0 -z-[1] h-full opacity-100 w-full bg-transparent bg-gradient-to-b from-transparent from-36 via-[#15171cbf] via-72 to-grey-600 to-100% bg-0-top bg-repeat-x bg-cover' />
            </CarouselItem>
          )
        })}
      </CarouselContent>
    </Carousel>
  )
}
