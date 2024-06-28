import { walletKeys, WALLET_QUERY_KEYS } from '@/api/wallet/walletKeys'
import { useToaster } from '@/providers/ToastProvider'
import { WalletAsset } from '@/models/wallet/walletAsset'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { WALLET, GET, ASSETS } = WALLET_QUERY_KEYS

const fetchWalletAssets = async (address: string): Promise<WalletAsset[]> => {
  const response = await http.get<WalletAsset[]>(`${WALLET}/${GET}/${address}/${ASSETS}`)
  return response.data
}

export const useFetchWalletAssets = (address: string, enabled = true) => {
  const toaster = useToaster()

  return useQuery({
    queryFn: () => fetchWalletAssets(address),
    queryKey: walletKeys.getAssets(address),
    staleTime: 1000 * 60 * 30, // stale for 30 minutes,
    enabled,
    onError: toaster.onQueryError,
  })
}
