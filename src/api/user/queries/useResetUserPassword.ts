import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { onQueryError, toast } from '@/components/ui/toast/use-toast'
import { ResetPasswordData } from '@/models/auth/resetPassword'
import { useMutation } from '@tanstack/react-query'
import http from '@/api/http'

const { USER, RESET_PASSWORD } = USER_QUERY_KEYS

const resetUserPassword = async (resetPasswordData: ResetPasswordData): Promise<void> => {
  const response = await http.patch<void>(`${USER}/${RESET_PASSWORD}`, resetPasswordData)
  return response.data
}

export const useResetUserPassword = () => {
  return useMutation({
    mutationFn: (resetPasswordData: ResetPasswordData) => resetUserPassword(resetPasswordData),
    onSuccess: () => {
      toast({ description: 'Password reset successful!', variant: 'success' })
    },
    throwOnError: onQueryError,
  })
}
