import { useMemo } from 'react'
import { comicKeys } from '@/api/comic/comicKeys'
import { ComicParams } from '@/models/comic/comicParams'
import { useToaster } from '@/providers/ToastProvider'
import { useInfiniteQuery } from 'react-query'
import { fetchComics } from '@/app/lib/api/comic/queries'

export const useFetchComics = (params: ComicParams, enabled = true) => {
  const toaster = useToaster()

  const infiniteQuery = useInfiniteQuery({
    queryKey: comicKeys.getMany(params),
    queryFn: ({ pageParam = 0 }) => fetchComics({ ...params, skip: pageParam * params.take }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length >= params.take) return allPages.length
    },
    staleTime: 1000 * 60 * 60 * 1, // stale for 1 hour
    enabled: enabled && !!params.take,
    onError: toaster.onQueryError,
  })

  const { data } = infiniteQuery
  const flatData = useMemo(() => {
    if (!data) return []
    return data.pages.flatMap((page) => page)
  }, [data])

  return { ...infiniteQuery, flatData }
}
