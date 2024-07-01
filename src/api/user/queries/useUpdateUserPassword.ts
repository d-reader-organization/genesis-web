import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { useToaster } from '@/providers/ToastProvider'
import { UpdatePasswordData } from '@/models/auth/updatePassword'
import { useMutation } from 'react-query'
import http from '@/api/http'

const { USER, UPDATE_PASSWORD } = USER_QUERY_KEYS

const updateUserPassword = async (id: string | number, request: UpdatePasswordData): Promise<void> => {
  const response = await http.patch<void>(`${USER}/${UPDATE_PASSWORD}/${id}`, request)
  return response.data
}

export const useUpdateUserPassword = (id: string | number) => {
  const toaster = useToaster()

  return useMutation({
    mutationFn: (updateData: UpdatePasswordData) => updateUserPassword(id, updateData),
    onSuccess: () => {
      toaster.add('Password updated!', 'success')
    },
    onError: toaster.onQueryError,
  })
}
