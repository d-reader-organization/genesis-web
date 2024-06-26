import { genreKeys, GENRE_QUERY_KEYS } from '@/api/genre/genreKeys'
import { useToaster } from '@/providers/ToastProvider'
import { Pagination } from '@/models/pagination'
import { useQuery } from 'react-query'
import { Genre } from '@/models/genre'
import http from '@/api/http'

const { GENRE, GET } = GENRE_QUERY_KEYS

const fetchGenres = async (params?: Pagination): Promise<Genre[]> => {
	const response = await http.get<Genre[]>(`${GENRE}/${GET}`, { params })
	return response.data
}

export const useFetchGenres = (params?: Pagination) => {
	const toaster = useToaster()

	return useQuery({
		queryFn: () => fetchGenres(params),
		queryKey: genreKeys.getMany(params),
		staleTime: 1000 * 60 * 60 * 1, // stale for 1 hour
		onError: toaster.onQueryError,
	})
}
