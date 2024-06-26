import { useMemo } from 'react'
import { creatorKeys, CREATOR_QUERY_KEYS } from '@/api/creator/creatorKeys'
import { useToaster } from '@/providers/ToastProvider'
import { CreatorParams } from '@/models/creator/creatorParams'
import { Creator } from '@/models/creator'
import { useInfiniteQuery } from 'react-query'
import http from '@/api/http'

const { CREATOR, GET } = CREATOR_QUERY_KEYS

const fetchCreators = async (params: CreatorParams): Promise<Creator[]> => {
	const response = await http.get<Creator[]>(`${CREATOR}/${GET}`, { params })
	return response.data
}

export const useFetchCreators = (params: CreatorParams, enabled = true) => {
	const toaster = useToaster()

	const infiniteQuery = useInfiniteQuery({
		queryKey: creatorKeys.getMany(params),
		queryFn: ({ pageParam = 0 }) => fetchCreators({ ...params, skip: pageParam * params.take }),
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
