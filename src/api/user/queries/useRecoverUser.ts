import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { USER, RECOVER } = USER_QUERY_KEYS

const recoverUser = async (slug: string): Promise<void> => {
  const response = await http.patch<void>(`${USER}/${RECOVER}/${slug}`)
  return response.data
}

export const useRecoverUser = (slug: string) => {
  const toaster = useToaster()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => recoverUser(slug),
    onSuccess: () => {
      toaster.add('Account recovered!', 'success')
      queryClient.invalidateQueries([USER_QUERY_KEYS.USER, USER_QUERY_KEYS.GET])
    },
    onError: toaster.onQueryError,
  })
}
