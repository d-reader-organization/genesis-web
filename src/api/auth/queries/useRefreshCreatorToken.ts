import { AUTH_QUERY_KEYS } from '@/api/auth/authKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useMutation } from 'react-query'
import http from '@/api/http'

const { AUTH, CREATOR, REFRESH_TOKEN } = AUTH_QUERY_KEYS

export const refreshCreatorToken = async (refreshToken: string): Promise<string> => {
  const response = await http.patch<string>(`${AUTH}/${CREATOR}/${REFRESH_TOKEN}/${refreshToken}`)
  return response.data
}

export const useRefreshCreatorToken = () => {
  const toaster = useToaster()

  return useMutation({
    mutationFn: (refreshToken: string) => refreshCreatorToken(refreshToken),
    retry: 0,
    onError: toaster.onQueryError,
  })
}
