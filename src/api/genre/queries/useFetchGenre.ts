import { genreKeys, GENRE_QUERY_KEYS } from '@/api/genre/genreKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useQuery } from 'react-query'
import { Genre } from '@/models/genre'
import http from '@/api/http'

const { GENRE, GET } = GENRE_QUERY_KEYS

const fetchGenre = async (slug: string): Promise<Genre[]> => {
	const response = await http.get<Genre[]>(`${GENRE}/${GET}/${slug}`)
	return response.data
}

export const useFetchGenre = (slug: string) => {
	const toaster = useToaster()

	return useQuery({
		queryFn: () => fetchGenre(slug),
		queryKey: genreKeys.get(slug),
		staleTime: 1000 * 60 * 60 * 1, // stale for 1 hour
		onError: toaster.onQueryError,
	})
}
