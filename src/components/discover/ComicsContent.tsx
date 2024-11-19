'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Text } from '../ui'
import { fetchComics } from '@/app/lib/api/comic/queries'
import { useDiscoverFilterStore } from '@/providers/DiscoverFilterStoreProvider'
import { useEffect, useState } from 'react'
import { Comic } from '@/models/comic'
import { RoutePath } from '@/enums/routePath'

export const ComicsContent: React.FC = () => {
  const comicParams = useDiscoverFilterStore((state) => state.comicParams)
  const [comics, setComics] = useState<Comic[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchComics(comicParams)
        setComics(data)
      } catch (error) {
        console.error('Error occured while fetching comics: ', error)
      }
    }

    fetchData()
  }, [comicParams])

  return (
    <div className='grid 660:grid-cols-4 max-sm:1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-2'>
      {comics.map((comic: Comic) => (
        <Link
          href={RoutePath.Comic(comic.slug)}
          className='flex flex-col w-full rounded-xl hover:brightness-125 border border-grey-300 p-2'
          key={comic.title}
        >
          <div className='rounded-xl'>
            <Image
              alt={comic.title + ' Cover'}
              src={comic.cover}
              className='rounded-xl h-auto w-full'
              height={1000}
              width={900}
            />
            {/* <Text as='p' styleVariant='body-normal' fontWeight='bold' className='absolute inset-2'>1EP</Text>  */}
          </div>
          <div className='flex flex-col gap-1 p-2 mt-2 justify-center h-full'>
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
  )
}
