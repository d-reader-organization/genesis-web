import { userKeys, USER_QUERY_KEYS } from '@/api/user/userKeys'
import { WALLET_QUERY_KEYS } from '@/api/wallet'
import { useToaster } from '@/providers/ToastProvider'
import { useQuery, useQueryClient } from 'react-query'
import http from '@/api/http'

const { USER, SYNC_WALLETS } = USER_QUERY_KEYS

const syncUserWallets = async (id: string | number): Promise<void> => {
  const response = await http.get<void>(`${USER}/${SYNC_WALLETS}/${id}`)
  return response.data
}

export const useSyncUserWallets = (id: string | number) => {
  const toaster = useToaster()
  const queryClient = useQueryClient()

  return useQuery({
    queryFn: () => syncUserWallets(id),
    queryKey: userKeys.syncWallets(id),
    staleTime: Infinity, // never becomes stale
    onSuccess: () => {
      toaster.add('Wallets synced!', 'success')
      queryClient.invalidateQueries(userKeys.getAssets(id))
      queryClient.invalidateQueries({
        predicate: (query) => {
          return (
            query.queryKey[0] === WALLET_QUERY_KEYS.WALLET &&
            query.queryKey[1] === WALLET_QUERY_KEYS.GET &&
            query.queryKey[3] === WALLET_QUERY_KEYS.ASSETS
          )
        },
      })
    },
    onError: toaster.onQueryError,
  })
}
