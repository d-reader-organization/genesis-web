import { userAuthKeys, AUTH_QUERY_KEYS } from '@/api/auth/authKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { AUTH, USER, VALIDATE_NAME } = AUTH_QUERY_KEYS

const fetchValidateUserName = async (name: string): Promise<void> => {
  const response = await http.get<void>(`${AUTH}/${USER}/${VALIDATE_NAME}/${name}`)
  return response.data
}

export const useFetchValidateUserName = (name: string) => {
  const toaster = useToaster()

  return useQuery({
    queryFn: () => fetchValidateUserName(name),
    queryKey: userAuthKeys.validateName(name),
    onError: toaster.onQueryError,
  })
}
