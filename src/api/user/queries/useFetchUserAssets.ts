import { userKeys, USER_QUERY_KEYS } from '@/api/user/userKeys'
import { useToaster } from '@/providers/ToastProvider'
import { WalletAsset } from '@/models/wallet/walletAsset'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { USER, GET, ASSETS } = USER_QUERY_KEYS

const fetchUserAssets = async (id: string | number): Promise<WalletAsset[]> => {
  const response = await http.get<WalletAsset[]>(`${USER}/${GET}/${id}/${ASSETS}`)
  return response.data
}

export const useFetchUserAssets = (id: string | number) => {
  const toaster = useToaster()

  return useQuery({
    queryFn: () => fetchUserAssets(id),
    queryKey: userKeys.getAssets(id),
    staleTime: 1000 * 60 * 5, // stale for 5 minutes
    onError: toaster.onQueryError,
  })
}
