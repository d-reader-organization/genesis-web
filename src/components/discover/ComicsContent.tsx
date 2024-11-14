'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Text } from '../ui'
import { fetchComics } from '@/app/lib/api/comic/queries'
import { useDiscoverFilterStore } from '@/providers/DiscoverFilterStoreProvider'
import { useEffect, useState } from 'react'
import { Comic } from '@/models/comic'

export const ComicsContent: React.FC = () => {
  const comicParams = useDiscoverFilterStore((state) => state.comicParams)
  const [comics, setComics] = useState<Comic[] | undefined>(undefined)

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
    <div className='grid grid-cols-6 gap-6 pt-2'>
      {comics?.map((comic: Comic) => (
        <Link href={comic.slug} className='relative h-[295px] rounded-xl hover:brightness-125' key={comic.title}>
          <Image alt={comic.title + ' Cover'} src={comic.cover} className='object-cover rounded-xl' fill />
          <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-xl'></div>
          <div className='relative z-10 p-4 flex flex-col gap-2 justify-end h-full'>
            <div className='flex flex-col gap-1 items-start justify-end'>
              <Text as='p' styleVariant='body-small' fontWeight='bold'>
                {comic.title}
              </Text>
              <Text as='p' styleVariant='body-xsmall'>
                {comic.creator?.name ? 'by ' + comic.creator?.name : ''}
              </Text>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
