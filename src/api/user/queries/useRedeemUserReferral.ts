import { redeemUserReferral } from '@/app/lib/api/user/queries'
import { onQueryError, toast } from '@/components/ui/toast/use-toast'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

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
