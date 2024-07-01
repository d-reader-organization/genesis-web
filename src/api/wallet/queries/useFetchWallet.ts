import { walletKeys, WALLET_QUERY_KEYS } from '@/api/wallet/walletKeys'
import { useToaster } from '@/providers/ToastProvider'
import { Wallet } from '@/models/wallet'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { WALLET, GET } = WALLET_QUERY_KEYS

const fetchWallet = async (address: string): Promise<Wallet> => {
  const response = await http.get<Wallet>(`${WALLET}/${GET}/${address}`)
  return response.data
}

export const useFetchWallet = (address: string) => {
  const toaster = useToaster()

  return useQuery({
    queryFn: () => fetchWallet(address),
    queryKey: walletKeys.get(address),
    staleTime: 1000 * 60 * 60 * 1, // stale for 1 hour
    onError: toaster.onQueryError,
  })
}
