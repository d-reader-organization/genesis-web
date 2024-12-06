'use client'

import { useEffect } from 'react'
import { useDiscoverQueryStore } from '@/providers/DiscoverQueryStoreProvider'
import LoaderCircle from 'public/assets/vector-icons/loader-circle.svg'
import { Text } from '../ui'
import ChevronDownIcon from 'public/assets/vector-icons/chevron-down.svg'

type Props = {
  entries: string
  isFetching: boolean
  isFetched: boolean
  fetchNextPage: () => void
  hasNextPage: boolean
  arrayLength: number
}

export const GridStatus: React.FC<Props> = ({
  isFetching,
  isFetched,
  fetchNextPage,
  entries,
  hasNextPage,
  arrayLength,
}) => {
  const updateFetching = useDiscoverQueryStore((state) => state.updateFetching)

  useEffect(() => {
    updateFetching(isFetching)
  }, [isFetching, updateFetching])

  if (isFetching && !isFetched) {
    return (
      <div className='flex justify-center items-center py-10'>
        <LoaderCircle className='size-8 animate-spin text-yellow-500 sm:size-10' />
        <Text as='span' styleVariant='body-normal' className='ml-3 max-sm:text-sm'>
          Loading...
        </Text>
      </div>
    )
  }

  if (isFetched && arrayLength === 0) {
    return (
      <Text
        as='span'
        styleVariant='body-normal'
        className='flex justify-center items-center max-sm:text-small py-10 text-gray-500'
      >
        No {entries} found
      </Text>
    )
  }

  if (isFetching) {
    return (
      <div className='flex justify-center py-10'>
        <LoaderCircle className='size-8 animate-spin text-yellow-500 sm:size-10' />
      </div>
    )
  }

  if (hasNextPage && !isFetching) {
    return (
      <div className='flex justify-center'>
        <button
          onClick={fetchNextPage}
          className='flex w-fit justify-center items-center gap-2 px-4 py-3 max-h-12 mt-6 bg-transparent text-grey-100 rounded-xl hover:brightness-110 border border-grey-300'
        >
          <Text as='span' styleVariant='body-normal' fontWeight='bold' className='max-md:text-sm'>
            Show more
          </Text>
          <ChevronDownIcon className='w-4 h-4 md:w-6 md:h-6' />
        </button>
      </div>
    )
  }

  return null
}
