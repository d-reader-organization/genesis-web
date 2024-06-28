import { comicKeys, COMIC_QUERY_KEYS } from '@/api/comic/comicKeys'
import { useUserAuth } from '@/providers/UserAuthProvider'
import { useToaster } from '@/providers/ToastProvider'
import { Comic } from '@/models/comic'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { COMIC, GET } = COMIC_QUERY_KEYS

const fetchComic = async (slug: string): Promise<Comic> => {
  const response = await http.get<Comic>(`${COMIC}/${GET}/${slug}`)
  return response.data
}

export const useFetchComic = (slug: string) => {
  const { isAuthenticated } = useUserAuth()
  const toaster = useToaster()

  return useQuery({
    queryFn: () => fetchComic(slug),
    queryKey: comicKeys.get(slug),
    staleTime: 1000 * 60 * 60 * 1, // stale for 1 hour
    enabled: isAuthenticated && !!slug,
    onError: toaster.onQueryError,
  })
}
