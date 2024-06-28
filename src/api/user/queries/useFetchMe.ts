import { userKeys, USER_QUERY_KEYS } from '@/api/user/userKeys'
import { useUserAuth } from '@/providers/UserAuthProvider'
import { useToaster } from '@/providers/ToastProvider'
import { User } from '@/models/user'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { USER, GET, ME } = USER_QUERY_KEYS

const fetchMe = async (): Promise<User> => {
  const response = await http.get<User>(`${USER}/${GET}/${ME}`)
  return response.data
}

export const useFetchMe = () => {
  const { isAuthenticated } = useUserAuth()
  const toaster = useToaster()

  return useQuery({
    queryFn: fetchMe,
    queryKey: userKeys.getMe,
    staleTime: 1000 * 60 * 60 * 12, // stale for 1 hour
    enabled: isAuthenticated,
    onError: toaster.onQueryError,
  })
}
