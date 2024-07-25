import { walletKeys } from '@/api/wallet/walletKeys'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { useQuery } from '@tanstack/react-query'
import { fetchWallets } from '@/app/lib/api/wallet/queries'

export const useFetchWallets = () => {
  return useQuery({
    queryFn: () => fetchWallets(),
    queryKey: walletKeys.getMany,
    staleTime: 1000 * 60 * 60 * 1, // stale for 1 hour
    throwOnError: onQueryError,
  })
}
