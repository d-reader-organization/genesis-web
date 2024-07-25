import { onQueryError, toast } from '@/components/ui/toast/use-toast'
import { useMutation } from '@tanstack/react-query'
import { RequestEmailChangeParams } from '@/models/user/requestEmailChangeParams'
import { requestUserEmailChange } from '@/app/lib/api/user/mutations'

export const useRequestUserEmailChange = () => {
  return useMutation({
    mutationFn: (data: RequestEmailChangeParams) => requestUserEmailChange(data),
    onSuccess: () => {
      toast({
        description: 'Verification mail sent to your new email address. Check your inbox!',
        variant: 'success',
      })
    },
    throwOnError: onQueryError,
  })
}
