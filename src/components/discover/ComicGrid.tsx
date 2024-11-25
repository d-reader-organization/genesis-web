'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Text } from '../ui'
import { useDiscoverFilterStore } from '@/providers/DiscoverFilterStoreProvider'
import { Comic } from '@/models/comic'
import { RoutePath } from '@/enums/routePath'
import { useFetchComics } from '@/api/comic/queries'
import { useMemo } from 'react'
import { ShowMoreButton } from './ShowMoreButton'

export const ComicGrid: React.FC = () => {
  const storeComicParams = useDiscoverFilterStore((state) => state.comicParams)
  const comicParams = useMemo(() => storeComicParams, [storeComicParams])
  const { flatData: comics, fetchNextPage, hasNextPage, isFetching, isError } = useFetchComics(comicParams)

  return (
    <div className='flex flex-col items-center'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 1160:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 pt-2'>
        {comics.map((comic: Comic) => (
          <Link
            href={RoutePath.Comic(comic.slug)}
            className='flex flex-col relative w-full h-[307px] rounded-xl hover:brightness-125 border border-grey-300 p-2'
            key={comic.title}
          >
            <Image
              alt={comic.title + ' Cover'}
              src={comic.cover}
              className='rounded-xl h-[233px] w-full'
              height={1000}
              width={895}
            />
            <Text
              as='p'
              styleVariant='body-normal'
              fontWeight='bold'
              className='absolute bg-gray-700 bg-opacity-60 top-3 right-3 rounded-xl px-2'
            >
              {comic.stats?.issuesCount} EP
            </Text>
            <div className='flex flex-col pl-2 mt-2 justify-center'>
              <Text as='p' styleVariant='body-large' fontWeight='bold'>
                {comic.title}
              </Text>
              <Text as='p' styleVariant='body-normal'>
                {comic.creator ? 'by ' + comic.creator.name : ''}
              </Text>
            </div>
          </Link>
        ))}
      </div>
      {hasNextPage && <ShowMoreButton onClick={fetchNextPage} disabled={isFetching} />}
    </div>
  )
}
