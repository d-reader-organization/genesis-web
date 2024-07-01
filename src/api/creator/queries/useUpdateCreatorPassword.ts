import { CREATOR_QUERY_KEYS } from '@/api/creator/creatorKeys'
import { useToaster } from '@/providers/ToastProvider'
import { UpdatePasswordData } from '@/models/auth/updatePassword'
import { useMutation } from 'react-query'
import http from '@/api/http'

const { CREATOR, UPDATE_PASSWORD } = CREATOR_QUERY_KEYS

const updateCreatorPassword = async (slug: string, request: UpdatePasswordData): Promise<void> => {
  const response = await http.patch<void>(`${CREATOR}/${UPDATE_PASSWORD}/${slug}`, request)
  return response.data
}

export const useUpdateCreatorPassword = (slug: string, updateData: UpdatePasswordData) => {
  const toaster = useToaster()

  return useMutation({
    mutationFn: () => updateCreatorPassword(slug, updateData),
    onSuccess: () => {
      toaster.add('Password updated!', 'success')
    },
    onError: toaster.onQueryError,
  })
}
