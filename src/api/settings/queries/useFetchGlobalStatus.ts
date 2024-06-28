import { settingsKeys, SETTINGS_QUERY_KEYS } from '@/api/settings/settingsKeys'
import { useToaster } from '@/providers/ToastProvider'
import { GlobalStatus } from '@/models/settings/globalStatus'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { SETTINGS, GLOBAL_STATUS, GET } = SETTINGS_QUERY_KEYS

const fetchGlobalStatus = async (): Promise<GlobalStatus[]> => {
  const response = await http.get<GlobalStatus[]>(`${SETTINGS}/${GLOBAL_STATUS}/${GET}`)
  return response.data
}

export const useFetchGlobalStatus = () => {
  const toaster = useToaster()

  return useQuery({
    queryFn: fetchGlobalStatus,
    queryKey: settingsKeys.getGlobalStatus,
    staleTime: 1000 * 60 * 60 * 1, // stale for 1 hour
    onError: toaster.onQueryError,
  })
}
