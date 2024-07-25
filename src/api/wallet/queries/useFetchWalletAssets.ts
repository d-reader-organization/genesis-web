import { walletKeys } from '@/api/wallet/walletKeys'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { useQuery } from '@tanstack/react-query'
import { fetchWalletAssets } from '@/app/lib/api/wallet/queries'

export const useFetchWalletAssets = (address: string, enabled = true) => {
  return useQuery({
    queryFn: () => fetchWalletAssets(address),
    queryKey: walletKeys.getAssets(address),
    staleTime: 1000 * 60 * 30, // stale for 30 minutes,
    enabled,
    throwOnError: onQueryError,
  })
}
