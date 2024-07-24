import { useMemo } from 'react'
import { comicIssueKeys } from '@/api/comicIssue/comicIssueKeys'
import { ComicIssueParams } from '@/models/comicIssue/comicIssueParams'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchComicIssues } from '@/app/lib/api/comicIssue/queries'
import { onQueryError } from '@/components/ui/toast/use-toast'

type Input = {
  enabled?: boolean
  params: ComicIssueParams
}

export const useFetchComicIssues = ({ enabled = true, params }: Input) => {
  const infiniteQuery = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: comicIssueKeys.getMany(params),
    queryFn: ({ pageParam = 0 }) => fetchComicIssues({ ...params, skip: pageParam * params.take }),
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
