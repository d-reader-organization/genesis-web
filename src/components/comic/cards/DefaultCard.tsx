import { Comic } from '@/models/comic'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Text } from '@/components/ui'
import { CopiesCount } from '@/components/shared/CopiesCount'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  comic: Comic
  href: string
}

export const DefaultComicCard: React.FC<Props> = ({ className, href, comic }) => (
  <Link
    href={href}
    prefetch={false}
    className={cn(
      'h-[242px] md:h-[295px] w-full max-w-[240px] rounded-xl hover:brightness-110 flex flex-col gap-1.5',
      className
    )}
  >
    <div className='relative size-full'>
      <Image
        alt='card cover'
        src={comic.cover}
        fill
        sizes='(max-width: 1200px) 240px, 320px'
        className='object-cover rounded-xl w-full opacity-50'
      />
      <Image
        alt='comic logo'
        src={comic.logo}
        width={120}
        height={120}
        className='object-cover h-120 w-auto absolute m-auto top-0 bottom-0 left-0 right-0 pointer-events-none'
      />
      <CopiesCount count={comic.stats?.issuesCount ?? 0} withText />
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
  </Link>
)
