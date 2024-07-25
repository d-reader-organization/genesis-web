import { userKeys } from '@/api/user/userKeys'
import { syncUserWallets } from '@/app/lib/api/user/queries'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { useQuery } from '@tanstack/react-query'

export const useSyncUserWallets = (id: string | number) => {
  return useQuery({
    queryFn: () => syncUserWallets(id),
    queryKey: userKeys.syncWallets(id),
    staleTime: Infinity, // never becomes stale
    throwOnError: onQueryError,
  })
}
