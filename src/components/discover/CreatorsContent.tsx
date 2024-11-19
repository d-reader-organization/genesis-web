'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Text } from '../ui'
import { useDiscoverFilterStore } from '@/providers/DiscoverFilterStoreProvider'
import { useEffect, useState } from 'react'
import { fetchCreators } from '@/app/lib/api/creator/queries'
import { Creator } from '@/models/creator'
import { RoutePath } from '@/enums/routePath'
import { IconLink } from '@/components/shared/IconLink'
import UserPlusIcon from 'public/assets/vector-icons/user-plus-icon.svg'
import { AvatarImage } from '@/components/shared/AvatarImage'

export const CreatorsContent: React.FC = () => {
  const creatorParams = useDiscoverFilterStore((state) => state.creatorParams)
  const [creators, setCreators] = useState<Creator[]>([])

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
    <div className='grid grid-cols-3 gap-6 pt-2'>
      {creators.map((creator: Creator) => (
        <Link
          href={RoutePath.Creator(creator.slug)}
          className='w-[357px] h-[216px] rounded-xl hover:brightness-125 justify-center items-center border border-grey-300 p-2'
          key={creator.slug}
        >
          <div className='flex flex-col w-full h-full relative'>
            <div className='w-full h-[400px] relative overflow-hidden rounded-xl'>
              <Image
                alt={creator.name + ' Cover'}
                src={creator.banner}
                className='rounded-xl h-auto'
                style={{ objectPosition: 'top', objectFit: 'cover' }}
                fill
              />
            </div>
            <div className='relative p-2 mt-2 flex gap-2 items-center justify-between h-full'>
              <AvatarImage src={creator.avatar} size={42} className='absolute inset-0 inset-x-4 -inset-y-10' />
              <div className='flex flex-col items-start justify-end'>
                <Text as='p' styleVariant='body-large' fontWeight='bold' className=''>
                  {creator.name}
                </Text>
                <Text as='p' styleVariant='body-normal' className=''>
                  {creator.stats.followersCount + ' Followers'}
                </Text>
              </div>

              <IconLink
                className='flex bg-grey-400 rounded-lg sm:rounded-xl gap-2 p-4 text-grey-100'
                href={'placeholder'}
                Icon={UserPlusIcon}
                blank
              >
                <UserPlusIcon className='w-5' />
                <Text as='p' styleVariant='body-large' fontWeight='medium' className='max-sm:text-xs'>
                  Follow
                </Text>
              </IconLink>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
