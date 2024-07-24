import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { onQueryError, toast, uploadingFiles } from '@/components/ui/toast/use-toast'
import { User } from '@/models/user'
import { useMutation } from '@tanstack/react-query'
import http from '@/api/http'
import { useRouter } from 'next/navigation'

const { USER, UPDATE, AVATAR } = USER_QUERY_KEYS

const updateUserAvatar = async (id: string | number, request: FormData): Promise<User> => {
  const response = await http.patch<User>(`${USER}/${UPDATE}/${id}/${AVATAR}`, request)
  return response.data
}

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
