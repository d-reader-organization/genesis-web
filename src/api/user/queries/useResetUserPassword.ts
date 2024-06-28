import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { useToaster } from '@/providers/ToastProvider'
import { ResetPasswordData } from '@/models/auth/resetPassword'
import { useMutation } from 'react-query'
import http from '@/api/http'

const { USER, RESET_PASSWORD } = USER_QUERY_KEYS

const resetUserPassword = async (resetPasswordData: ResetPasswordData): Promise<void> => {
  const response = await http.patch<void>(`${USER}/${RESET_PASSWORD}`, resetPasswordData)
  return response.data
}

export const useResetUserPassword = () => {
  const toaster = useToaster()

  return useMutation({
    mutationFn: (resetPasswordData: ResetPasswordData) => resetUserPassword(resetPasswordData),
    onSuccess: () => {
      toaster.add('Password reset successful!', 'success')
    },
    onError: toaster.onQueryError,
  })
}
