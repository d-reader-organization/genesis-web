'use client'

import { useDiscoverQueryStore } from '@/providers/DiscoverQueryStoreProvider'
import { useFetchComics } from '@/api/comic/queries'
import { DefaultComicCard } from '../comic/cards/DefaultCard'
import { GridStatus } from './GridStatus'

export const ComicGrid: React.FC = () => {
  const comicParams = useDiscoverQueryStore((state) => state.comicParams)
  const { flatData: comics, fetchNextPage, hasNextPage, isFetching, isFetched } = useFetchComics(comicParams)

  return (
    <>
      {isFetched && comics.length > 0 && (
        <div className='grid grid-cols-2 md:grid-cols-3 1160:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 sm:gap-6 pt-1 sm:pt-2'>
          {comics.map((comic) => (
            <DefaultComicCard key={comic.slug} comic={comic} />
          ))}
        </div>
      )}
      <GridStatus
        entries='comics'
        isFetching={isFetching}
        isFetched={isFetched}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        arrayLength={comics.length}
      />
    </>
  )
}
