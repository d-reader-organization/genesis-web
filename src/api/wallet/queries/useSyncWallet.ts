import { walletKeys, WALLET_QUERY_KEYS } from '@/api/wallet/walletKeys'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { useQuery } from '@tanstack/react-query'
import http from '@/api/http'

const { WALLET, SYNC } = WALLET_QUERY_KEYS

const syncWallet = async (address: string): Promise<void> => {
  const response = await http.get<void>(`${WALLET}/${SYNC}/${address}`)
  return response.data
}

export const useSyncWallet = (address: string) => {
  return useQuery({
    queryFn: () => syncWallet(address),
    queryKey: walletKeys.get(address),
    staleTime: Infinity, // never becomes stale

    throwOnError: onQueryError,
  })
}
