import { CREATOR_QUERY_KEYS } from '@/api/creator/creatorKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useMutation } from 'react-query'
import http from '@/api/http'

const { CREATOR, RESET_PASSWORD } = CREATOR_QUERY_KEYS

const resetCreatorPassword = async (slug: string): Promise<void> => {
  const response = await http.patch<void>(`${CREATOR}/${RESET_PASSWORD}/${slug}`)
  return response.data
}

export const useResetCreatorPassword = (slug: string) => {
  const toaster = useToaster()

  return useMutation({
    mutationFn: () => resetCreatorPassword(slug),
    onSuccess: () => {
      toaster.add('Password reset, check your email inbox!', 'success')
    },
    onError: toaster.onQueryError,
  })
}
