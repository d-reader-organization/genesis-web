import { useMemo } from 'react'
import { comicKeys } from '@/api/comic/comicKeys'
import { ComicParams } from '@/models/comic/comicParams'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchComics } from '@/app/lib/api/comic/queries'
import { onQueryError } from '@/components/ui/toast/use-toast'

export const useFetchComics = (params: ComicParams, enabled = true) => {
  const infiniteQuery = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: comicKeys.getMany(params),
    queryFn: ({ pageParam = 0 }) => fetchComics({ ...params, skip: pageParam * params.take }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length >= params.take) return allPages.length
    },
    staleTime: 1000 * 60 * 60 * 1, // stale for 1 hour
    enabled: enabled && !!params.take,
    throwOnError: onQueryError,
  })

  const { data } = infiniteQuery
  const flatData = useMemo(() => {
    if (!data) return []
    return data.pages.flatMap((page) => page)
  }, [data])

  return { ...infiniteQuery, flatData }
}
