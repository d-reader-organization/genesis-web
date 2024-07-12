import { useMemo } from 'react'
import { comicIssueKeys } from '@/api/comicIssue/comicIssueKeys'
import { useToaster } from '@/providers/ToastProvider'
import { ComicIssueParams } from '@/models/comicIssue/comicIssueParams'
import { useInfiniteQuery } from 'react-query'
import { fetchComicIssues } from '@/app/lib/api/comicIssue/queries'

type Input = {
  enabled?: boolean
  params: ComicIssueParams
}

export const useFetchComicIssues = ({ enabled = true, params }: Input) => {
  const toaster = useToaster()

  const infiniteQuery = useInfiniteQuery({
    queryKey: comicIssueKeys.getMany(params),
    queryFn: ({ pageParam = 0 }) => fetchComicIssues({ ...params, skip: pageParam * params.take }),
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
