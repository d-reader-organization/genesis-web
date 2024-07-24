import { userKeys } from '@/api/user/userKeys'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { useQuery } from '@tanstack/react-query'
import { isNil } from 'lodash'
import { fetchUserWallets } from '@/app/lib/api/user/queries'

export const useFetchUserWallets = (id: string | number) => {
  return useQuery({
    queryFn: () => fetchUserWallets(id),
    queryKey: userKeys.getWallets(id),
    staleTime: 1000 * 60 * 5, // stale for 5 minutes
    enabled: !isNil(id) && id !== 0,
    throwOnError: onQueryError,
  })
}
