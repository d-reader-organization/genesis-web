import { useMemo } from 'react'
import { comicIssueKeys, COMIC_ISSUE_QUERY_KEYS } from '@/api/comicIssue/comicIssueKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useCreatorAuth } from '@/providers/CreatorAuthProvider'
import { RawComicIssueArray } from '@/models/comicIssue/rawComicIssue'
import { RawComicIssueParams } from '@/models/comicIssue/comicIssueParams'
import { useInfiniteQuery } from 'react-query'
import http from '@/api/http'

const { COMIC_ISSUE, GET_RAW } = COMIC_ISSUE_QUERY_KEYS

const fetchRawComicIssues = async (params: RawComicIssueParams): Promise<RawComicIssueArray> => {
  const response = await http.get<RawComicIssueArray>(`${COMIC_ISSUE}/${GET_RAW}`, { params })
  return response.data
}

export const useFetchRawComicIssues = (params: RawComicIssueParams, enabled = true) => {
  const { isAuthenticated } = useCreatorAuth()
  const toaster = useToaster()

  const infiniteQuery = useInfiniteQuery({
    queryKey: comicIssueKeys.getManyRaw(params),
    queryFn: ({ pageParam = 0 }) => fetchRawComicIssues({ ...params, skip: pageParam * params.take }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length >= params.take) return allPages.length
    },
    staleTime: 1000 * 60 * 60 * 1, // stale for 1 hour
    enabled: isAuthenticated && enabled && !!params.take,
    onError: toaster.onQueryError,
  })

  const { data } = infiniteQuery
  const flatData = useMemo(() => {
    if (!data) return []
    return data.pages.flatMap((page) => page)
  }, [data])

  return { ...infiniteQuery, flatData }
}
