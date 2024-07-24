import { useMemo } from 'react'
import { comicKeys, COMIC_QUERY_KEYS } from '@/api/comic/comicKeys'
import { ComicParams } from '@/models/comic/comicParams'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Comic } from '@/models/comic'
import http from '@/api/http'
import { onQueryError } from '@/components/ui/toast/use-toast'

const { COMIC, GET, BY_OWNER } = COMIC_QUERY_KEYS

const fetchComicsByOwner = async (params: ComicParams, userId: number): Promise<Comic[]> => {
  const response = await http.get<Comic[]>(`${COMIC}/${GET}/${BY_OWNER}/${userId}`, { params })
  return response.data
}

export const useFetchComicsByOwner = (params: ComicParams, userId: number, enabled = true) => {
  const infiniteQuery = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: comicKeys.getMany(params),
    queryFn: ({ pageParam = 0 }) => fetchComicsByOwner({ ...params, skip: pageParam * params.take }, userId),
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
