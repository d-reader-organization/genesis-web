import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { onQueryError, toast } from '@/components/ui/toast/use-toast'
import { useMutation } from '@tanstack/react-query'
import http from '@/api/http'
import { ReuqestEmailChangeParams } from '@/models/user/requestEmailChangeParams'

const { USER, REQUEST_EMAIL_CHANGE } = USER_QUERY_KEYS

const requestUserEmailChange = async (data: ReuqestEmailChangeParams): Promise<void> => {
  const response = await http.patch<void>(`${USER}/${REQUEST_EMAIL_CHANGE}`, data)
  return response.data
}

export const useRequestUserEmailChange = () => {
  return useMutation({
    mutationFn: (data: ReuqestEmailChangeParams) => requestUserEmailChange(data),
    onSuccess: () => {
      toast({
        description: 'Verification mail sent to your new email address. Check your inbox!',
        variant: 'success',
      })
    },
    throwOnError: onQueryError,
  })
}
