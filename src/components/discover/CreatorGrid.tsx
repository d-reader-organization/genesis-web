'use client'

import { useDiscoverQueryStore } from '@/providers/DiscoverQueryStoreProvider'
import { useFetchCreators } from '@/api/creator/queries'
import { DefaultCard } from '../creator/cards/DefaultCard'
import { GridStatus } from './GridStatus'

export const CreatorGrid: React.FC = () => {
  const creatorParams = useDiscoverQueryStore((state) => state.creatorParams)
  const { flatData: creators, fetchNextPage, hasNextPage, isFetching, isFetched } = useFetchCreators(creatorParams)

  return (
    <>
      {isFetched && creators.length > 0 && (
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 pt-1 sm:pt-2'>
          {creators.map((creator) => (
            <DefaultCard key={creator.slug} creator={creator} />
          ))}
        </div>
      )}
      <GridStatus
        entries='creators'
        isFetching={isFetching}
        isFetched={isFetched}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        arrayLength={creators.length}
      />
    </>
  )
}
