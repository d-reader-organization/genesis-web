'use client'

import { useEffect } from 'react'
import { useToast } from '../ui'
import { useDiscoverQueryStore } from '@/providers/DiscoverQueryStoreProvider'
import { useFetchCreators } from '@/api/creator/queries'
import { CreatorCard } from './CreatorCard'
import { ShowMoreButton } from './ShowMoreButton'

export const CreatorGrid: React.FC = () => {
  const creatorParams = useDiscoverQueryStore((state) => state.creatorParams)
  const { flatData: creators, fetchNextPage, hasNextPage, isFetching, isError } = useFetchCreators(creatorParams)
  const { toast } = useToast()

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Error!',
        description: 'There was a problem fetching creator data',
        variant: 'error',
      })
    }
  }, [isError])

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-2'>
        {creators.map((creator) => (
          <CreatorCard key={creator.slug} creator={creator} />
        ))}
      </div>
      <div className='flex flex-col items-center'>
        {hasNextPage && <ShowMoreButton onClick={fetchNextPage} disabled={isFetching} />}
      </div>
    </>
  )
}
