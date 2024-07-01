import { creatorKeys, CREATOR_QUERY_KEYS } from '@/api/creator/creatorKeys'
import { useCreatorAuth } from '@/providers/CreatorAuthProvider'
import { useToaster } from '@/providers/ToastProvider'
import { BasicCreator } from '@/models/creator'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { CREATOR, GET, ME } = CREATOR_QUERY_KEYS

const fetchMe = async (): Promise<BasicCreator> => {
  const response = await http.get<BasicCreator>(`${CREATOR}/${GET}/${ME}`)
  return response.data
}

export const useFetchMe = () => {
  const { isAuthenticated } = useCreatorAuth()
  const toaster = useToaster()

  return useQuery({
    queryFn: fetchMe,
    queryKey: creatorKeys.getMe,
    staleTime: 1000 * 60 * 60 * 12, // stale for 1 hour
    enabled: isAuthenticated,
    onError: toaster.onQueryError,
    // retry: false,
  })
}
