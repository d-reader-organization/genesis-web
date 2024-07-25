import { onQueryError, toast } from '@/components/ui/toast/use-toast'
import { useMutation } from '@tanstack/react-query'
import { verifyUserEmail } from '@/app/lib/api/user/mutations'

export const useVerifyUserEmail = () => {
  return useMutation({
    mutationFn: (verificationToken: string) => verifyUserEmail(verificationToken),
    onSuccess: () => {
      toast({
        description: 'Email address verified!',
        variant: 'success',
      })
    },
    throwOnError: onQueryError,
  })
}
