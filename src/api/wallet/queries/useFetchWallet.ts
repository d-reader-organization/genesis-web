import { walletKeys } from '@/api/wallet/walletKeys'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { useQuery } from '@tanstack/react-query'
import { fetchWallet } from '@/app/lib/api/wallet/queries'

export const useFetchWallet = (address: string) => {
  return useQuery({
    queryFn: () => fetchWallet(address),
    queryKey: walletKeys.get(address),
    staleTime: 1000 * 60 * 60 * 1, // stale for 1 hour
    throwOnError: onQueryError,
  })
}
