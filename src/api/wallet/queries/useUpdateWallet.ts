import { onQueryError, toast } from '@/components/ui/toast/use-toast'
import { UpdateWalletData } from '@/models/wallet'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { updateWallet } from '@/app/lib/api/wallet/mutations'

export const useUpdateWallet = (address: string) => {
  const { refresh } = useRouter()

  return useMutation({
    mutationFn: (updateData: UpdateWalletData) => updateWallet(address, updateData),
    onSuccess: () => {
      toast({ description: 'Wallet updated!', variant: 'success' })
      refresh()
    },
    throwOnError: onQueryError,
  })
}
