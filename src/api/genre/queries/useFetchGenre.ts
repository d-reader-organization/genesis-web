import { genreKeys, GENRE_QUERY_KEYS } from '@/api/genre/genreKeys'
import { useQuery } from '@tanstack/react-query'
import { Genre } from '@/models/genre'
import http from '@/api/http'
import { onQueryError } from '@/components/ui/toast/use-toast'

const { GENRE, GET } = GENRE_QUERY_KEYS

const fetchGenre = async (slug: string): Promise<Genre[]> => {
  const response = await http.get<Genre[]>(`${GENRE}/${GET}/${slug}`)
  return response.data
}

export const useFetchGenre = (slug: string) => {
  return useQuery({
    queryFn: () => fetchGenre(slug),
    queryKey: genreKeys.get(slug),
    staleTime: 1000 * 60 * 60 * 1, // stale for 1 hour
    throwOnError: onQueryError,
  })
}
