import { onQueryError, toast } from '@/components/ui/toast/use-toast'
import { useMutation } from '@tanstack/react-query'
import { requestUserEmailVerification } from '@/app/lib/api/user/queries'

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
