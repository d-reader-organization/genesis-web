import { useMutation } from '@tanstack/react-query'
import { RequestPasswordResetParams } from '@/models/user/requestPasswordResetParams'
import { onQueryError, useToast } from '@/components/ui'
import { requestUserPasswordReset } from '@/app/lib/api/user/mutations'

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
