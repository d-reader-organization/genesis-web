import { WALLET_QUERY_KEYS } from '@/api/wallet/walletKeys'
import { onQueryError, toast } from '@/components/ui/toast/use-toast'
import { Wallet, UpdateWalletData } from '@/models/wallet'
import { useMutation } from '@tanstack/react-query'
import http from '@/api/http'
import { useRouter } from 'next/navigation'

const { WALLET, UPDATE } = WALLET_QUERY_KEYS

const updateWallet = async (address: string, request: UpdateWalletData): Promise<Wallet> => {
  const response = await http.patch<Wallet>(`${WALLET}/${UPDATE}/${address}`, request)
  return response.data
}

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
