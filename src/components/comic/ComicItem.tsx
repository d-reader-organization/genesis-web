import { Comic } from '@/models/comic'
import clsx from 'clsx'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import React from 'react'
import Image from 'next/image'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  comic: Comic
  priority?: boolean
  fetchPriority?: 'auto' | 'high' | 'low'
}

const blurDataUrl = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOUV9LaBAAB8gEfSTtbmAAAAABJRU5ErkJggg=='

const ComicItem: React.FC<Props> = ({ comic, className, priority, fetchPriority, ...props }) => {
  const nextPage = RoutePath.Comic(comic.slug)

  return (
    <div
      className={clsx(
        'relative border-[3.2px] rounded-2xl border-solid border-grey-500 aspect-comic-cover-aspect-ratio w-full cursor-pointer pointer transition ease-in transform duration-200 hover:-translate-y-1',
        className
      )}
    >
      <Link className='absolute top-0 left-0 w-full h-full' href={nextPage}>
        <Image
          sizes='1000px'
          className='-z-[1] object-cover rounded-2xl opacity-1 brightness-[0.7] bg-grey-500 aspect-comic-cover-aspect-ratio hover:brightness-125'
          src={comic.cover}
          loading='eager'
          alt={`cover-${comic.title}`}
          fill
          priority={priority}
          fetchPriority={fetchPriority}
          placeholder='blur'
          blurDataURL={blurDataUrl}
        />
        <Image
          sizes='450px'
          className='max-w-[180px] max-h-[80%] object-cover p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          src={comic.logo}
          loading='eager'
          alt={`logo-${comic.title}`}
          width={180}
          height={180}
          priority={priority}
          placeholder='blur'
          blurDataURL={blurDataUrl}
        />
      </Link>
    </div>
  )
}

export default ComicItem
