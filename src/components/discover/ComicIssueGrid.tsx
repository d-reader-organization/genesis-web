'use client'

import { useDiscoverQueryStore } from '@/providers/DiscoverQueryStoreProvider'
import { useFetchComicIssues } from '@/api/comicIssue/queries'
import { ComicIssue } from '@/models/comicIssue'
import { DefaultComicIssueCard } from '../comicIssue/cards/DefaultCard'
import { ShowMoreButton } from './ShowMoreButton'
import { Loader } from '../shared/Loader'

export const ComicIssueGrid: React.FC = () => {
  const comicIssueParams = useDiscoverQueryStore((state) => state.comicIssueParams)

  const {
    flatData: comicIssues,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetched,
  } = useFetchComicIssues({ params: comicIssueParams })

  if (isFetching && !isFetched) {
    return <Loader className='mx-auto mt-8' />
  }

  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-3 1160:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 sm:gap-6 pt-1 sm:pt-2'>
        {comicIssues.map((comicIssue: ComicIssue) => (
          <DefaultComicIssueCard key={comicIssue.id} comicIssue={comicIssue} />
        ))}
      </div>
      <div className='flex flex-col items-center'>
        <ShowMoreButton
          onClick={fetchNextPage}
          isFetching={isFetching}
          itemsFound={comicIssues.length}
          hasNextPage={hasNextPage}
        />
      </div>
    </>
  )
}
