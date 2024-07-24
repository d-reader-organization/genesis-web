import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { onQueryError, toast } from '@/components/ui/toast/use-toast'
import { User } from '@/models/user'
import { useMutation } from '@tanstack/react-query'
import http from '@/api/http'
import { useRouter } from 'next/navigation'

const { USER, REDEEM_REFERRAL } = USER_QUERY_KEYS

const redeemUserReferral = async (referrer: string): Promise<User> => {
  const response = await http.patch<User>(`${USER}/${REDEEM_REFERRAL}/${referrer}`)
  return response.data
}

export const useRedeemUserReferral = () => {
  const { refresh } = useRouter()

  return useMutation({
    mutationFn: (referrer: string) => redeemUserReferral(referrer),
    onSuccess: (user) => {
      toast({
        description: 'Referral claimed!',
        variant: 'success',
      })
      refresh()
    },
    throwOnError: onQueryError,
  })
}
