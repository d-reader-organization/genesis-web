import { userKeys } from '@/api/user/userKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useQuery } from 'react-query'
import { isNil } from 'lodash'
import { fetchUserWallets } from '@/app/lib/api/user/queries'

export const useFetchUserWallets = (id: string | number) => {
  const toaster = useToaster()

  return useQuery({
    queryFn: () => fetchUserWallets(id),
    queryKey: userKeys.getWallets(id),
    staleTime: 1000 * 60 * 5, // stale for 5 minutes
    enabled: !isNil(id) && id !== 0,
    onError: toaster.onQueryError,
  })
}
