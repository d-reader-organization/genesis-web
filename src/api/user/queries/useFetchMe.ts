import { userKeys } from '@/api/user/userKeys'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { useQuery } from '@tanstack/react-query'
import { fetchMe } from '@/app/lib/api/user/queries'

export const useFetchMe = () => {
  return useQuery({
    queryFn: () => fetchMe(),
    queryKey: userKeys.getMe,
    staleTime: 1000 * 60 * 60 * 12, // stale for 1 hour
    throwOnError: onQueryError,
  })
}
