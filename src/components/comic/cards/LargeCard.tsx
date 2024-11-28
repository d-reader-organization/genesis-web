import { Comic } from '@/models/comic'
import Link from 'next/link'
import React from 'react'
import { ContentWithGradientImageBg } from '../../shared/ContentWithGradientImageBg'
import { cn } from '@/lib/utils'
import { Text } from '../../ui/Text'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  comic: Comic
  index: number
  href: string
}

export const LargeComicCard: React.FC<Props> = ({ className, comic, index, href }) => (
  <ContentWithGradientImageBg
    image={comic.cover}
    className={cn('h-[229px] md:h-[279px] hover:brightness-110 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)]', className)}
    gradientDirectionClassName='bg-gradient-to-t'
  >
    <Link href={href} prefetch={false} className='flex flex-col justify-end h-full w-full p-6'>
      <div className='flex gap-4 items-center'>
        <span className='text-white text-opacity-40 text-[48px] font-bold leading-[57.6px]'>{index + 1}</span>
        <div className='flex flex-col'>
          <Text
            as='span'
            styleVariant='body-normal'
            fontWeight='bold'
            className='line-clamp-1 overflow-ellipsis max-md:text-sm'
          >
            {comic.title}
          </Text>
          <Text
            as='span'
            styleVariant='body-small'
            fontWeight='medium'
            className='line-clamp-1 overflow-ellipsis text-grey-100 max-md:text-xs'
          >
            by&nbsp;{comic.creator?.name}
          </Text>
        </div>
      </div>
    </Link>
  </ContentWithGradientImageBg>
)
