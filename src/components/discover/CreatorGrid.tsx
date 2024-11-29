'use client'

import { useDiscoverQueryStore } from '@/providers/DiscoverQueryStoreProvider'
import { useFetchCreators } from '@/api/creator/queries'
import { HorizontalCreatorCard } from '../creator/cards/HorizontalCard'
import { ShowMoreButton } from './ShowMoreButton'

export const CreatorGrid: React.FC = () => {
  const creatorParams = useDiscoverQueryStore((state) => state.creatorParams)
  const { flatData: creators, fetchNextPage, hasNextPage, isFetching } = useFetchCreators(creatorParams)

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pt-2'>
        {creators.map((creator) => (
          <HorizontalCreatorCard key={creator.slug} creator={creator} />
        ))}
      </div>
      <div className='flex flex-col items-center'>
        {hasNextPage && <ShowMoreButton onClick={fetchNextPage} disabled={isFetching} />}
      </div>
    </>
  )
}
