import { settingsKeys, SETTINGS_QUERY_KEYS } from '@/api/settings/settingsKeys'
import { SplToken } from '@/models/settings/splToken'
import { useQuery } from '@tanstack/react-query'
import http from '@/api/http'
import { onQueryError } from '@/components/ui/toast/use-toast'

const { SETTINGS, SPL_TOKEN, GET } = SETTINGS_QUERY_KEYS

const fetchSupportedTokens = async (): Promise<SplToken[]> => {
  const response = await http.get<SplToken[]>(`${SETTINGS}/${SPL_TOKEN}/${GET}`)
  return response.data
}

export const useFetchSupportedTokens = () => {
  return useQuery({
    queryFn: fetchSupportedTokens,
    queryKey: settingsKeys.getSupportedTokens,
    staleTime: 1000 * 60 * 60 * 12, // stale for 12 hours
    throwOnError: onQueryError,
  })
}
