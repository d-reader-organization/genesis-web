import { websocketKeys, WEBSOCKET_QUERY_KEYS } from '@/api/websocket/websocketKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { WEBSOCKET, WAVE } = WEBSOCKET_QUERY_KEYS

const websocketWave = async (): Promise<void> => {
  const response = await http.get<void>(`${WEBSOCKET}/${WAVE}`)
  return response.data
}

export const useWebsocketWave = () => {
  const toaster = useToaster()

  return useQuery({
    queryFn: websocketWave,
    queryKey: websocketKeys.wave,
    staleTime: 1000 * 60 * 1, // stale for 1 minute
    onError: toaster.onQueryError,
  })
}
