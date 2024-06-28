import { useMemo } from 'react'
import { userKeys, USER_QUERY_KEYS } from '@/api/user/userKeys'
import { useToaster } from '@/providers/ToastProvider'
import { UserParams } from '@/models/user/userParams'
import { User } from '@/models/user'
import { useInfiniteQuery } from 'react-query'
import http from '@/api/http'

const { USER, GET } = USER_QUERY_KEYS

const fetchUsers = async (params: UserParams): Promise<User[]> => {
  const response = await http.get<User[]>(`${USER}/${GET}`, { params })
  return response.data
}

export const useFetchUsers = (params: UserParams, enabled = true) => {
  const toaster = useToaster()

  const infiniteQuery = useInfiniteQuery({
    queryKey: userKeys.getMany(params),
    queryFn: ({ pageParam = 0 }) => fetchUsers({ ...params, skip: pageParam * params.take }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length >= params.take) return allPages.length
    },
    staleTime: 1000 * 60 * 5, // stale for 5 minutes
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
