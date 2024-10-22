import { Comic } from '@/models/comic'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button, Text } from '@/components/ui'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  comic: Comic
  href: string
}

export const OwnedCard: React.FC<Props> = ({ className, comic, href }) => (
  <Link
    href={href}
    className={cn(
      'relative overflow-hidden h-[242px] md:h-[330px] w-full max-w-[178px] md:max-w-[223px] rounded-xl hover:brightness-110 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)]',
      className
    )}
  >
    <Image
      alt='card cover'
      src={comic.cover}
      fill
      sizes='(max-width: 1200px) 500px, 320px'
      className='object-cover rounded-xl'
    />
    <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent' />
    <div className='relative z-10 h-full flex flex-col justify-end'>
      <div className='flex size-8 px-2 justify-center items-center rounded-xl backdrop-blur-md bg-white bg-opacity-20 absolute top-2 right-2'>
        <Text as='span' styleVariant='body-small' fontWeight='bold' className='leading-140'>
          {comic.stats?.issuesCount}
        </Text>
      </div>
      <Image
        alt='comic logo'
        src={comic.logo}
        width={120}
        height={120}
        className='object-cover h-120 w-auto absolute m-auto -top-16 md:-top-6 bottom-0 left-0 right-0 pointer-events-none'
      />
      <div className='flex flex-col gap-4 p-4 pt-0'>
        <div className='flex flex-col gap-0.5'>
          <span className='text-base font-bold leading-[22.4px] line-clamp-1 overflow-ellipsis'>{comic.title}</span>
          <span className='text-sm font-medium leading-[19.6px] text-grey-100 line-clamp-1 overflow-ellipsis'>
            by&nbsp;{comic.creator?.name}
          </span>
        </div>
        {/* TODO open medju screen */}
        <Button
          className='max-h-[42px] min-w-40 py-3 px-6 flex justify-center items-center rounded-xl backdrop-blur-md bg-white bg-opacity-10 w-4/5 self-center'
          variant='ghost'
        >
          Info
        </Button>
      </div>
    </div>
  </Link>
)
