'use client'

import { useEffect } from 'react'
import { useDiscoverQueryStore } from '@/providers/DiscoverQueryStoreProvider'
import { useFetchComicIssues } from '@/api/comicIssue/queries'
import { useToast } from '../ui'
import { ComicIssue } from '@/models/comicIssue'
import { ShowMoreButton } from './ShowMoreButton'
import { ComicIssueCard } from '../comicIssue/cards/ComicIssueCard'

export const ComicIssueGrid: React.FC = () => {
  const comicIssueParams = useDiscoverQueryStore((state) => state.comicIssueParams)

  const {
    flatData: comicIssues,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isError,
  } = useFetchComicIssues({ params: comicIssueParams })

  const { toast } = useToast()

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Error!',
        description: 'There was a problem fetching comic episodes data',
        variant: 'error',
      })
    }
  }, [isError, toast])

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 1160:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 pt-2'>
        {comicIssues.map((comicIssue: ComicIssue) => (
          <ComicIssueCard key={comicIssue.id} comicIssue={comicIssue} />
        ))}
      </div>
      <div className='flex flex-col items-center'>
        {hasNextPage && <ShowMoreButton onClick={fetchNextPage} disabled={isFetching} />}
      </div>
    </>
  )
}
