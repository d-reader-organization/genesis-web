import { userKeys } from '@/api/user/userKeys'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { useQuery } from '@tanstack/react-query'
import { fetchUserAssets } from '@/app/lib/api/user/queries'

export const useFetchUserAssets = (id: string | number) => {
  return useQuery({
    queryFn: () => fetchUserAssets(id),
    queryKey: userKeys.getAssets(id),
    staleTime: 1000 * 60 * 5, // stale for 5 minutes
    throwOnError: onQueryError,
  })
}
