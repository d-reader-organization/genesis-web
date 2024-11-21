'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Text } from '../ui'
import { useDiscoverFilterStore } from '@/providers/DiscoverFilterStoreProvider'
import { useEffect, useMemo, useState } from 'react'
import { fetchCreators } from '@/app/lib/api/creator/queries'
import { Creator } from '@/models/creator'
import { RoutePath } from '@/enums/routePath'
import { IconLink } from '@/components/shared/IconLink'
import UserPlusIcon from 'public/assets/vector-icons/user-plus-icon.svg'
import { AvatarImage } from '@/components/shared/AvatarImage'
import { useFetchCreators } from '@/api/creator/queries'

export const CreatorGrid: React.FC = () => {
  const storeCreatorParams = useDiscoverFilterStore((state) => state.creatorParams)
  const creatorParams = useMemo(() => storeCreatorParams, [storeCreatorParams])
  const { flatData: creators, fetchNextPage, hasNextPage, isFetching, isError } = useFetchCreators(creatorParams)

  return (
    <div className='grid grid-cols-4 gap-6 pt-2'>
      {creators.map((creator: Creator) => (
        <Link
          href={RoutePath.Creator(creator.slug)}
          className='flex flex-col h-[220px] w-full rounded-xl hover:brightness-125 border border-grey-300 p-2'
          key={creator.slug}
        >
          <Image
            src={creator.banner}
            alt={creator.name + ' Cover'}
            className='rounded-xl h-[126px] w-full'
            style={{ objectFit: 'cover', objectPosition: 'top' }}
            width={1000}
            height={895}
          />
          <div className='relative p-2 flex gap-2 items-end justify-between h-full'>
            <AvatarImage
              src={creator.avatar}
              alt={creator.name + ' Avatar'}
              size='medium'
              className='absolute inset-x-4 -inset-y-8'
            />
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
        </Link>
      ))}
    </div>
  )
}
