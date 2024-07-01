import { userAuthKeys, AUTH_QUERY_KEYS } from '@/api/auth/authKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { AUTH, USER, VALIDATE_EMAIL } = AUTH_QUERY_KEYS

const fetchValidateUserEmail = async (email: string): Promise<void> => {
  const response = await http.get<void>(`${AUTH}/${USER}/${VALIDATE_EMAIL}/${email}`)
  return response.data
}

export const useFetchValidateUserEmail = (email: string) => {
  const toaster = useToaster()

  return useQuery({
    queryFn: () => fetchValidateUserEmail(email),
    queryKey: userAuthKeys.validateEmail(email),
    onError: toaster.onQueryError,
  })
}
