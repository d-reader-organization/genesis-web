import { Badge } from '@/components/shared/Badge'
import { ContentWithGradientImageBg } from '@/components/shared/ContentWithGradientImageBg'
import { CarouselSlide } from '@/models/carousel/carouselSlide'
import { getSlideUrl } from '@/utils/helpers'
import Link from 'next/link'
import React from 'react'

type Props = {
  slide: CarouselSlide
}

export const CarouselCard: React.FC<Props> = ({ slide }) => {
  return (
    <ContentWithGradientImageBg
      className='rounded-xl max-h-[511px] max-w-[354px]  shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)] hover:brightness-110'
      gradientDirectionClassName='bg-gradient-to-t'
      image={slide.image}
    >
      <Link href={getSlideUrl(slide) ?? ''} target='_blank' className='flex flex-col justify-between h-full'>
        <Badge>
          <span className='size-[14px] rounded-full bg-green-500 mr-2 text-white' />
          {slide.tags?.at(0)?.title ?? 'Highlighted'}
        </Badge>
        <div className='flex flex-col gap-4'>
          <p className='text-grey-100 line-clamp-1 text-ellipsis whitespace-nowrap text-xl font-medium'>
            {slide.title}
          </p>
          <p className='line-clamp-1 text-ellipsis whitespace-nowrap text-xl font-bold'>{slide.subtitle}</p>
        </div>
      </Link>
    </ContentWithGradientImageBg>
  )
}
