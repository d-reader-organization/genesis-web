import { USER_QUERY_KEYS, userKeys } from '@/api/user/userKeys'
import { useToaster } from '@/providers/ToastProvider'
import { User } from '@/models/user'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { USER, REDEEM_REFERRAL } = USER_QUERY_KEYS

const redeemUserReferral = async (referrer: string): Promise<User> => {
  const response = await http.patch<User>(`${USER}/${REDEEM_REFERRAL}/${referrer}`)
  return response.data
}

export const useRedeemUserReferral = () => {
  const toaster = useToaster()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (referrer: string) => redeemUserReferral(referrer),
    onSuccess: (user) => {
      toaster.add('Referral claimed!', 'success')
      queryClient.invalidateQueries(userKeys.getMe)
      queryClient.invalidateQueries(userKeys.get(user.id))
    },
    onError: toaster.onQueryError,
  })
}
