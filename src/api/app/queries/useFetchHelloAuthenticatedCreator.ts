import { appKeys, APP_QUERY_KEYS } from '@/api/app/appKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useCreatorAuth } from '@/providers/CreatorAuthProvider'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { APP, HELLO_AUTHENTICATED_CREATOR } = APP_QUERY_KEYS

const fetchHelloAuthenticatedCreator = async (): Promise<string> => {
  const response = await http.get<string>(`${APP}/${HELLO_AUTHENTICATED_CREATOR}`)
  return response.data
}

export const useFetchHelloAuthenticatedCreator = () => {
  const { isAuthenticated } = useCreatorAuth()
  const toaster = useToaster()

  return useQuery({
    queryFn: fetchHelloAuthenticatedCreator,
    queryKey: appKeys.helloAuthenticatedCreator,
    staleTime: 1000 * 60 * 60 * 24, // stale for 1 day
    enabled: isAuthenticated,
    onError: toaster.onQueryError,
  })
}
