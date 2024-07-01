import { AUTH_QUERY_KEYS } from '@/api/auth/authKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useMutation } from 'react-query'
import http from '@/api/http'

const { AUTH, USER, REFRESH_TOKEN } = AUTH_QUERY_KEYS

export const refreshUserToken = async (refreshToken: string): Promise<string> => {
  const response = await http.patch<string>(`${AUTH}/${USER}/${REFRESH_TOKEN}/${refreshToken}`)
  return response.data
}

export const useRefreshUserToken = () => {
  const toaster = useToaster()

  return useMutation({
    mutationFn: (refreshToken: string) => refreshUserToken(refreshToken),
    retry: 0,
    onError: toaster.onQueryError,
  })
}
