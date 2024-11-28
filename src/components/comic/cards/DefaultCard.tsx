import { Comic } from '@/models/comic'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  comic: Comic
  href: string
}

export const DefaultComicCard: React.FC<Props> = ({ className, href, comic }) => (
  <Link
    href={href}
    prefetch={false}
    className={cn(
      'relative overflow-hidden h-[242px] md:h-[295px] w-full max-w-[223px] rounded-xl hover:brightness-110 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)]',
      className
    )}
  >
    <Image
      alt=''
      src={comic.cover}
      fill
      sizes='(max-width: 1200px) 500px, 320px'
      className='object-cover rounded-xl w-auto'
    />
    <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent' />
    <div className='relative z-10 h-full flex flex-col justify-end'>
      <Image
        alt='comic logo'
        src={comic.logo}
        width={120}
        height={120}
        className='object-cover h-120 w-auto absolute m-auto top-0 bottom-0 left-0 right-0 pointer-events-none'
      />
      <div className='flex flex-col gap-0.5 p-4 pt-0'>
        <span className='text-base font-bold leading-[22.4px] line-clamp-1 overflow-ellipsis'>{comic.title}</span>
        <span className='text-sm font-medium leading-[19.6px] text-grey-100 line-clamp-1 overflow-ellipsis'>
          by&nbsp;{comic.creator?.name}
        </span>
      </div>
    </div>
  </Link>
)
