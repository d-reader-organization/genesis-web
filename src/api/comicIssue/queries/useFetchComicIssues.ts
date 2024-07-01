import { useMemo } from 'react'
import { comicIssueKeys, COMIC_ISSUE_QUERY_KEYS } from '@/api/comicIssue/comicIssueKeys'
import { useToaster } from '@/providers/ToastProvider'
import { ComicIssue } from '@/models/comicIssue'
import { ComicIssueParams } from '@/models/comicIssue/comicIssueParams'
import { useInfiniteQuery } from 'react-query'
import http from '@/api/http'

const { COMIC_ISSUE, GET } = COMIC_ISSUE_QUERY_KEYS

const fetchComicIssues = async (params: ComicIssueParams): Promise<ComicIssue[]> => {
  const response = await http.get<ComicIssue[]>(`${COMIC_ISSUE}/${GET}`, { params })
  return response.data
}

export const useFetchComicIssues = (params: ComicIssueParams, enabled = true) => {
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
