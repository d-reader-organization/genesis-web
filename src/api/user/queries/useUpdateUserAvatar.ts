import { USER_QUERY_KEYS, userKeys } from '@/api/user/userKeys'
import { useToaster } from '@/providers/ToastProvider'
import { User } from '@/models/user'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { USER, UPDATE, AVATAR } = USER_QUERY_KEYS

const updateUserAvatar = async (id: string | number, request: FormData): Promise<User> => {
  const response = await http.patch<User>(`${USER}/${UPDATE}/${id}/${AVATAR}`, request)
  return response.data
}

export const useUpdateUserAvatar = (id: string | number) => {
  const toaster = useToaster()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (updateData: FormData) => updateUserAvatar(id, updateData),
    onSuccess: () => {
      toaster.add('Avatar updated!', 'success')
      queryClient.invalidateQueries(userKeys.get(id))
      queryClient.invalidateQueries(userKeys.getMe)
    },
    onMutate: toaster.uploadingFiles,
    onError: toaster.onQueryError,
  })
}
