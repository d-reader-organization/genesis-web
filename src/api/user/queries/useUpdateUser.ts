import { onQueryError, toast } from '@/components/ui/toast/use-toast'
import { UpdateUserData } from '@/models/user'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { updateUser } from '@/app/lib/api/user/mutations'

export const useUpdateUser = (id: string | number) => {
  const { refresh } = useRouter()

  return useMutation({
    mutationFn: (updateData: UpdateUserData) => updateUser(id, updateData),
    onSuccess: () => {
      toast({
        description: 'Account updated!',
        variant: 'success',
      })
      refresh()
    },
    throwOnError: onQueryError,
  })
}
