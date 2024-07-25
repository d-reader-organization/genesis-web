import { onQueryError, toast, uploadingFiles } from '@/components/ui/toast/use-toast'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { updateUserAvatar } from '@/app/lib/api/user/mutations'

export const useUpdateUserAvatar = (id: string | number) => {
  const { refresh } = useRouter()

  return useMutation({
    mutationFn: (updateData: FormData) => updateUserAvatar(id, updateData),
    onSuccess: () => {
      toast({
        description: 'Avatar updated!',
        variant: 'success',
      })
      refresh()
    },
    onMutate: uploadingFiles,
    throwOnError: onQueryError,
  })
}
