import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { USER, DELETE } = USER_QUERY_KEYS

const deleteUser = async (slug: string): Promise<void> => {
  const response = await http.patch<void>(`${USER}/${DELETE}/${slug}`)
  return response.data
}

export const useDeleteUser = (slug: string) => {
  const toaster = useToaster()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteUser(slug),
    onSuccess: () => {
      toaster.add('Account deleted!', 'success')
      queryClient.invalidateQueries([USER_QUERY_KEYS.USER, USER_QUERY_KEYS.GET])
    },
    onError: toaster.onQueryError,
  })
}
