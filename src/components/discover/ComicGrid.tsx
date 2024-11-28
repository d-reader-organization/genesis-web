'use client'

import { useToast } from '../ui'
import { useDiscoverQueryStore } from '@/providers/DiscoverQueryStoreProvider'
import { useFetchComics } from '@/api/comic/queries'
import { useEffect } from 'react'
import { ShowMoreButton } from './ShowMoreButton'
import { ComicCard } from './ComicCard'

export const ComicGrid: React.FC = () => {
  const comicParams = useDiscoverQueryStore((state) => state.comicParams)
  const { flatData: comics, fetchNextPage, hasNextPage, isFetching, isError } = useFetchComics(comicParams)
  const { toast } = useToast()

  useEffect(() => {
    if (isError) {
      toast({ title: 'Error!', description: 'There was a problem fetching comic data', variant: 'error' })
    }
  }, [isError])

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 1160:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 pt-2'>
        {comics.map((comic) => (
          <ComicCard key={comic.slug} comic={comic} />
        ))}
      </div>
      <div className='flex flex-col items-center'>
        {hasNextPage && <ShowMoreButton onClick={fetchNextPage} disabled={isFetching} />}
      </div>
    </>
  )
}
