'use client'

import { useEffect } from 'react'
import { useDiscoverQueryStore } from '@/providers/DiscoverQueryStoreProvider'
import LoaderCircle from 'public/assets/vector-icons/loader-circle.svg'
import { Text } from '../ui'

type Props = {
  entries: string
  isFetching: boolean
  isFetched: boolean
  arrayLength: number
}

export const GridStatus: React.FC<Props> = ({ isFetching, isFetched, entries, arrayLength }) => {
  const updateFetching = useDiscoverQueryStore((state) => state.updateFetching)

  useEffect(() => {
    updateFetching(isFetching)
  }, [isFetching, updateFetching])

  if (isFetching && !isFetched) {
    return (
      <div className='flex justify-center items-center py-10'>
        <LoaderCircle className='size-10 animate-spin text-yellow-500 sm:size-12' />
        <Text as='span' styleVariant='body-large' className='ml-3 max-sm:text-base'>
          Loading...
        </Text>
      </div>
    )
  }

  if (isFetched && arrayLength === 0) {
    return (
      <Text
        as='span'
        styleVariant='body-large'
        className='flex justify-center items-center max-sm:text-base py-10 text-gray-500'
      >
        No {entries} found
      </Text>
    )
  }

  return null
}
