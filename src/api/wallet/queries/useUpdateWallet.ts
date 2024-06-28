import { WALLET_QUERY_KEYS, walletKeys } from '@/api/wallet/walletKeys'
import { useToaster } from '@/providers/ToastProvider'
import { Wallet, UpdateWalletData } from '@/models/wallet'
import { useMutation, useQueryClient } from 'react-query'
import { useFetchMe } from '@/api/user/queries/useFetchMe'
import { userKeys } from '@/api/user/userKeys'
import http from '@/api/http'

const { WALLET, UPDATE } = WALLET_QUERY_KEYS

const updateWallet = async (address: string, request: UpdateWalletData): Promise<Wallet> => {
  const response = await http.patch<Wallet>(`${WALLET}/${UPDATE}/${address}`, request)
  return response.data
}

export const useUpdateWallet = (address: string) => {
  const toaster = useToaster()
  const { data: me } = useFetchMe()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (updateData: UpdateWalletData) => updateWallet(address, updateData),
    onSuccess: () => {
      toaster.add('Wallet updated!', 'success')
      queryClient.invalidateQueries(walletKeys.get(address))
      queryClient.invalidateQueries(userKeys.getWallets(me?.id || 0))
    },
    onError: toaster.onQueryError,
  })
}
