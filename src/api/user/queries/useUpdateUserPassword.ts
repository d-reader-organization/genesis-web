import { onQueryError, toast } from '@/components/ui/toast/use-toast'
import { UpdatePasswordData } from '@/models/auth/updatePassword'
import { useMutation } from '@tanstack/react-query'
import { updateUserPassword } from '@/app/lib/api/user/mutations'

export const useUpdateUserPassword = (id: string | number) => {
  return useMutation({
    mutationFn: (updateData: UpdatePasswordData) => updateUserPassword(id, updateData),
    onSuccess: () => {
      toast({
        description: 'Password updated!',
        variant: 'success',
      })
    },
    throwOnError: onQueryError,
  })
}
