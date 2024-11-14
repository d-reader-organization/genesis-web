'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Text } from '../ui'
import { useDiscoverFilterStore } from '@/providers/DiscoverFilterStoreProvider'
import { useEffect, useState } from 'react'
import { fetchCreators } from '@/app/lib/api/creator/queries'
import { Creator } from '@/models/creator'

export const CreatorsContent: React.FC = () => {
  const creatorParams = useDiscoverFilterStore((state) => state.creatorParams)
  const [creators, setCreators] = useState<Creator[] | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCreators(creatorParams)
        setCreators(data)
      } catch (error) {
        console.error('Error occured while fetching creators: ', error)
      }
    }

    fetchData()
  }, [creatorParams])

  return (
    <div className='grid grid-cols-6 gap-6 pt-2'>
      {creators?.map((creator: Creator) => (
        <Link href={creator.slug} className='relative h-[295px] rounded-xl hover:brightness-125' key={creator.slug}>
          <Image alt={creator.name + ' Cover'} src={creator.banner} className='object-cover rounded-xl' fill />
          <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-xl'></div>
          <div className='relative z-10 p-4 flex flex-col gap-2 justify-end h-full'>
            <div className='flex flex-col gap-1 items-start justify-end'>
              <Text as='p' styleVariant='body-small' fontWeight='bold'>
                {creator.name}
              </Text>
              <Text as='p' styleVariant='body-xsmall'>
                {'by ' + creator.name}
              </Text>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
