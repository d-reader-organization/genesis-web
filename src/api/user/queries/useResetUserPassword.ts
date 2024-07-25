import { resetUserPassword } from '@/app/lib/api/user/mutations'
import { onQueryError, toast } from '@/components/ui/toast/use-toast'
import { ResetPasswordData } from '@/models/auth/resetPassword'
import { useMutation } from '@tanstack/react-query'

export const useResetUserPassword = () => {
  return useMutation({
    mutationFn: (resetPasswordData: ResetPasswordData) => resetUserPassword(resetPasswordData),
    onSuccess: () => {
      toast({ description: 'Password reset successful!', variant: 'success' })
    },
    throwOnError: onQueryError,
  })
}
