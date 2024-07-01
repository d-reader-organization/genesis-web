import { creatorKeys, CREATOR_QUERY_KEYS } from '@/api/creator/creatorKeys'
import { useUserAuth } from '@/providers/UserAuthProvider'
import { useToaster } from '@/providers/ToastProvider'
import { Creator } from '@/models/creator'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { CREATOR, GET } = CREATOR_QUERY_KEYS

const fetchCreator = async (slug: string): Promise<Creator> => {
  const response = await http.get<Creator>(`${CREATOR}/${GET}/${slug}`)
  return response.data
}

export const useFetchCreator = (slug: string) => {
  const { isAuthenticated } = useUserAuth()
  const toaster = useToaster()

  return useQuery({
    queryFn: () => fetchCreator(slug),
    queryKey: creatorKeys.get(slug),
    staleTime: 1000 * 60 * 60 * 1, // stale for 1 hour
    enabled: isAuthenticated,
    onError: toaster.onQueryError,
  })
}
