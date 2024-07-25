import { walletKeys } from '@/api/wallet/walletKeys'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { useQuery } from '@tanstack/react-query'
import { syncWallet } from '@/app/lib/api/wallet/queries'

export const useSyncWallet = (address: string) => {
  return useQuery({
    queryFn: () => syncWallet(address),
    queryKey: walletKeys.get(address),
    staleTime: Infinity, // never becomes stale

    throwOnError: onQueryError,
  })
}
