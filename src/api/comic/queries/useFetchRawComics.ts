import { useMemo } from 'react'
import { useCreatorAuth } from '@/providers/CreatorAuthProvider'
import { comicKeys, COMIC_QUERY_KEYS } from '@/api/comic/comicKeys'
import { RawComicParams } from '@/models/comic/comicParams'
import { useToaster } from '@/providers/ToastProvider'
import { useInfiniteQuery } from 'react-query'
import { RawComic } from '@/models/comic/rawComic'
import http from '@/api/http'

const { COMIC, GET_RAW } = COMIC_QUERY_KEYS

const fetchRawComics = async (params: RawComicParams): Promise<RawComic[]> => {
	const response = await http.get<RawComic[]>(`${COMIC}/${GET_RAW}`, { params })
	return response.data
}

export const useFetchRawComics = (params: RawComicParams, enabled = true) => {
	const { isAuthenticated } = useCreatorAuth()
	const toaster = useToaster()

	const infiniteQuery = useInfiniteQuery({
		queryKey: comicKeys.getManyRaw(params),
		queryFn: ({ pageParam = 0 }) => fetchRawComics({ ...params, skip: pageParam * params.take }),
		getNextPageParam: (lastPage, allPages) => {
			if (lastPage.length >= params.take) return allPages.length
		},
		staleTime: 1000 * 60 * 30, // stale for 30 minutes
		enabled: isAuthenticated && enabled && !!params.creatorSlug && !!params.take,
		onError: toaster.onQueryError,
	})

	const { data } = infiniteQuery
	const flatData = useMemo(() => {
		if (!data) return []
		return data.pages.flatMap((page) => page)
	}, [data])

	return { ...infiniteQuery, flatData }
}
