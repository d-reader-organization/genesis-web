import { settingsKeys } from '@/api/settings/settingsKeys'
import { useQuery } from '@tanstack/react-query'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { fetchSupportedTokens } from '@/app/lib/api/settings/queries'

export const useFetchSupportedTokens = () => {
  return useQuery({
    queryFn: () => fetchSupportedTokens(),
    queryKey: settingsKeys.getSupportedTokens,
    staleTime: 1000 * 60 * 60 * 12, // stale for 12 hours
    throwOnError: onQueryError,
  })
}
