import { userKeys, USER_QUERY_KEYS } from '@/api/user/userKeys'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { useQuery } from '@tanstack/react-query'
import http from '@/api/http'

const { USER, SYNC_WALLETS } = USER_QUERY_KEYS

const syncUserWallets = async (id: string | number): Promise<void> => {
  const response = await http.get<void>(`${USER}/${SYNC_WALLETS}/${id}`)
  return response.data
}

export const useSyncUserWallets = (id: string | number) => {
  return useQuery({
    queryFn: () => syncUserWallets(id),
    queryKey: userKeys.syncWallets(id),
    staleTime: Infinity, // never becomes stale
    throwOnError: onQueryError,
  })
}
