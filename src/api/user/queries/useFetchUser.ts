import { userKeys, USER_QUERY_KEYS } from '@/api/user/userKeys'
import { useUserAuth } from '@/providers/UserAuthProvider'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { User } from '@/models/user'
import { useQuery } from '@tanstack/react-query'
import http from '@/api/http'

const { USER, GET } = USER_QUERY_KEYS

const fetchUser = async (id: string | number): Promise<User> => {
  const response = await http.get<User>(`${USER}/${GET}/${id}`)
  return response.data
}

export const useFetchUser = (id: string | number) => {
  const { isAuthenticated } = useUserAuth()

  return useQuery({
    queryFn: () => fetchUser(id),
    queryKey: userKeys.get(id),
    staleTime: 1000 * 60 * 5, // stale for 5 minutes
    enabled: isAuthenticated,
    throwOnError: onQueryError,
  })
}
