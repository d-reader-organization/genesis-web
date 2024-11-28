'use client'

import { Comic } from '@/models/comic'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Text } from '@/components/ui'
import { RoutePath } from '@/enums/routePath'
import { CopiesCount } from '@/components/shared/CopiesCount'
import { CardBorderWrapper } from '@/components/shared/CardBorderWrapper'
import { MoreHorizontalIcon } from 'lucide-react'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  comic: Comic
}

export const OwnedComicCard: React.FC<Props> = ({ comic }) => {
  return (
    <CardBorderWrapper className='flex flex-col gap-1 sm:gap-2 size-fit h-[262px] w-[156px] sm:h-[361px] sm:w-[226px]'>
      <div className='relative size-full max-h-[233px]'>
        <Image
          alt={`Owned comic cover ${comic.title}`}
          src={comic.cover}
          fill
          sizes='(max-width: 900px) 220px, 260px'
          className='object-cover rounded-xl w-auto opacity-50'
        />
        <Image
          alt={`Owned comic logo ${comic.title}`}
          src={comic.logo}
          width={120}
          height={120}
          className='object-cover h-120 w-auto absolute m-auto top-0 bottom-0 left-0 right-0 pointer-events-none'
        />
        <CopiesCount count={comic.myStats?.collectiblesCount ?? 0} />
      </div>
      <div className='flex flex-col gap-2 p-2'>
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
      <div className='flex gap-2 sm:p-2'>
        <Link
          className='h-9 sm:h-[42px] w-full  py-3 px-4 flex justify-center items-center rounded-xl bg-grey-400'
          href={RoutePath.ReadComic(comic.slug)}
          prefetch={false}
        >
          <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-100 max-sm:text-sm'>
            Read
          </Text>
        </Link>
        <Link
          className='h-9 sm:h-[42px] rounded-xl border border-grey-200 flex justify-center items-center py-2 px-3'
          href={RoutePath.OwnedAssets(comic.slug)}
          prefetch={false}
        >
          <MoreHorizontalIcon className='h-[18px] w-[18px]' />
        </Link>
      </div>
    </CardBorderWrapper>
  )
}
