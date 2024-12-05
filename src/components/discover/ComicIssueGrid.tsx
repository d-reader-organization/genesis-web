'use client'

import { useDiscoverQueryStore } from '@/providers/DiscoverQueryStoreProvider'
import { useFetchComicIssues } from '@/api/comicIssue/queries'
import { ComicIssue } from '@/models/comicIssue'
import { ComicIssueCard } from '../comicIssue/cards/ComicIssueCard'
import { GridStatus } from './GridStatus'

export const ComicIssueGrid: React.FC = () => {
  const comicIssueParams = useDiscoverQueryStore((state) => state.comicIssueParams)

  const {
    flatData: comicIssues,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetched,
  } = useFetchComicIssues({ params: comicIssueParams })

  return (
    <>
      {isFetched && comicIssues.length > 0 && (
        <div className='grid grid-cols-2 md:grid-cols-3 1160:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 sm:gap-6 pt-1 sm:pt-2'>
          {comicIssues.map((comicIssue: ComicIssue) => (
            <ComicIssueCard key={comicIssue.id} comicIssue={comicIssue} />
          ))}
        </div>
      )}
      <GridStatus
        entries='episodes'
        isFetching={isFetching}
        isFetched={isFetched}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        arrayLength={comicIssues.length}
      />
    </>
  )
}
