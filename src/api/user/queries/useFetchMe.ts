import { userKeys } from '@/api/user/userKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useQuery } from 'react-query'
import { fetchMe } from '@/app/lib/api/user/queries'

export const useFetchMe = () => {
  const toaster = useToaster()

  return useQuery({
    queryFn: () => fetchMe(),
    queryKey: userKeys.getMe,
    staleTime: 1000 * 60 * 60 * 12, // stale for 1 hour
    onError: toaster.onQueryError,
  })
}
