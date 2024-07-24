import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { onQueryError, toast } from '@/components/ui/toast/use-toast'
import { useMutation } from '@tanstack/react-query'
import http from '@/api/http'

const { USER, REQUEST_EMAIL_VERIFICATION } = USER_QUERY_KEYS

const requestUserEmailVerification = async (): Promise<void> => {
  const response = await http.patch<void>(`${USER}/${REQUEST_EMAIL_VERIFICATION}`)
  return response.data
}

export const useRequestUserEmailVerification = () => {
  return useMutation({
    mutationFn: () => requestUserEmailVerification(),
    onSuccess: () => {
      toast({
        description: 'Verification email sent, check your inbox!',
        variant: 'success',
      })
    },
    throwOnError: onQueryError,
  })
}
