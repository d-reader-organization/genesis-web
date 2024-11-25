'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Text, useToast } from '../ui'
import { useDiscoverFilterStore } from '@/providers/DiscoverFilterStoreProvider'
import { useEffect, useMemo } from 'react'
import { ComicIssue } from '@/models/comicIssue'
import { RoutePath } from '@/enums/routePath'
import { PriceTag } from '../shared/tags/PriceTag'
import { useFetchComicIssues } from '@/api/comicIssue/queries'
import { ShowMoreButton } from './ShowMoreButton'

export const ComicIssueGrid: React.FC = () => {
  const storeComicIssueParams = useDiscoverFilterStore((state) => state.comicIssueParams)
  const comicIssueParams = useMemo(() => storeComicIssueParams, [storeComicIssueParams])
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
      toast({ title: 'Error!', description: 'There was a problem fetching comic episodes data', variant: 'error' })
    }
  }, [isError])

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 660:grid-cols-3 1160:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-2'>
        {comicIssues.map((comicIssue: ComicIssue) => (
          <Link
            href={RoutePath.ComicIssue(comicIssue.id)}
            className='flex flex-col w-full h-[400px] p-2 border border-grey-300 rounded-xl hover:brightness-125'
            key={comicIssue.id}
          >
            <Image
              alt={comicIssue.title + ' Cover'}
              src={comicIssue.cover}
              width={895}
              height={1000}
              className='rounded-xl h-[304px] w-full'
            />
            <div className='flex flex-col text-gray-100 px-2 pt-2'>
              {comicIssue.comic && (
                <Text as='p' styleVariant='body-normal' className='text-gray-100'>
                  {comicIssue.comic.title}
                </Text>
              )}
              <Text as='p' styleVariant='body-large' fontWeight='bold'>
                {comicIssue.title}
              </Text>
              {comicIssue.stats && (
                <div className='flex w-full justify-between text-gray-100'>
                  <Text as='p' styleVariant='body-normal' className='text-gray-100'>
                    EP {comicIssue.number}/{comicIssue.stats.totalIssuesCount}
                  </Text>
                  <PriceTag
                    styleVariant='body-normal'
                    inline={false}
                    colorfulIcon
                    size={14}
                    price={comicIssue.stats.price}
                  />
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
      <div className='flex flex-col items-center'>
        {hasNextPage && <ShowMoreButton onClick={fetchNextPage} disabled={isFetching} />}
      </div>
    </>
  )
}
