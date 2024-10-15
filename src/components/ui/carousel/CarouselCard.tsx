import { Badge } from '@/components/shared/Badge'
import { CarouselSlide } from '@/models/carousel/carouselSlide'
import { getSlideUrl } from '@/utils/helpers'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

type Props = {
  slide: CarouselSlide
}

export const CarouselCard: React.FC<Props> = ({ slide }) => (
  <Link
    href={getSlideUrl(slide) ?? ''}
    target='_blank'
    className='relative overflow-hidden w-full xl:max-w-[400px] max-h-[511px] h-full max-md:h-80 rounded-xl shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)] hover:brightness-110'
  >
    <Image
      src={slide.image}
      alt='slide image'
      fill
      priority
      sizes='(max-width: 1024) 220px, auto'
      className='object-cover rounded-xl max-w-full w-full xl:max-w-[400px] max-h-[511px]'
    />
    <div className='absolute inset-0 bg-gradient-to-b from-transparent to-grey-600' />
    <div className='flex flex-col justify-between relative z-10 h-full p-4 pb-6'>
      <Badge>
        <span className='size-[14px] rounded-full bg-green-500 mr-2 text-white' />
        {slide.tags?.at(0)?.title ?? 'Highlighted'}
      </Badge>
      <div className='flex flex-col gap-1.5'>
        <p className='text-grey-100 text-xl font-medium line-clamp-1 text-ellipsis'>{slide.title}</p>
        <p className='text-xl font-bold line-clamp-1 text-ellipsis'>{slide.subtitle}</p>
      </div>
    </div>
  </Link>
)
