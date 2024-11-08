import { fetchUserInterestedReceipts } from '@/app/lib/api/invest/queries'
import { useQuery } from '@tanstack/react-query'
import { investKeys } from '../investKeys'
import { onQueryError } from '@/components/ui'

export const useFetchUserInterestedReceipts = (slug: string) => {
  return useQuery({
    queryFn: () => fetchUserInterestedReceipts(slug),
    queryKey: investKeys.getUserInterestedReceipts(slug),
    refetchInterval: 1000 * 10,
    enabled: !!slug,
    throwOnError: onQueryError,
  })
}
