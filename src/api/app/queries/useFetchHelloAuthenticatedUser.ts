import { appKeys, APP_QUERY_KEYS } from '@/api/app/appKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useUserAuth } from '@/providers/UserAuthProvider'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { APP, HELLO_AUTHENTICATED_USER } = APP_QUERY_KEYS

const fetchHelloAuthenticatedUser = async (): Promise<string> => {
  const response = await http.get<string>(`${APP}/${HELLO_AUTHENTICATED_USER}`)
  return response.data
}

export const useFetchHelloAuthenticatedUser = () => {
  const { isAuthenticated } = useUserAuth()
  const toaster = useToaster()

  return useQuery({
    queryFn: fetchHelloAuthenticatedUser,
    queryKey: appKeys.helloAuthenticatedUser,
    staleTime: 1000 * 60 * 60 * 24, // stale for 1 day
    enabled: isAuthenticated,
    onError: toaster.onQueryError,
  })
}
