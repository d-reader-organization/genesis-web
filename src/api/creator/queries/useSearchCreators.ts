import { useMemo } from 'react'
import { creatorKeys } from '@/api/creator/creatorKeys'
import { CreatorParams } from '@/models/creator/creatorParams'
import { useInfiniteQuery } from '@tanstack/react-query'
import { searchCreators } from '@/app/lib/api/creator/queries'
import { onQueryError } from '@/components/ui'

export const useSearchCreators = ({ params, enabled = false }: { params: CreatorParams; enabled?: boolean }) => {
  const infiniteQuery = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: creatorKeys.getMany(params),
    queryFn: ({ pageParam = 0 }) => searchCreators({ ...params, skip: pageParam * params.take }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length >= params.take) return allPages.length
    },
    staleTime: 1000 * 60, // stale for 1 minute
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