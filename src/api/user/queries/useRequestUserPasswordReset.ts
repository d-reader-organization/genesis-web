import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { useMutation } from '@tanstack/react-query'
import { RequestPasswordResetParams } from '@/models/user/requestPasswordResetParams'
import http from '@/api/http'
import { onQueryError, useToast } from '@/components/ui'

const { USER, REQUEST_PASSWORD_RESET } = USER_QUERY_KEYS

const requestUserPasswordReset = async (params: RequestPasswordResetParams): Promise<void> => {
  const response = await http.patch<void>(`${USER}/${REQUEST_PASSWORD_RESET}`, params)
  return response.data
}

export const useRequestUserPasswordReset = () => {
  const toaster = useToast()

  return useMutation({
    mutationFn: (params: RequestPasswordResetParams) => requestUserPasswordReset(params),
    onSuccess: () => {
      toaster.toast({
        title: 'Password reset instructions sent to your inbox!',
      })
    },
    onError: onQueryError,
  })
}
