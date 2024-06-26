import { appKeys, APP_QUERY_KEYS } from '@/api/app/appKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { APP, HEALTHCHECK } = APP_QUERY_KEYS

const fetchHealthcheck = async (): Promise<string> => {
	const response = await http.get<string>(`${APP}/${HEALTHCHECK}`)
	return response.data
}

export const useFetchHealthcheck = () => {
	const toaster = useToaster()

	return useQuery({
		queryFn: fetchHealthcheck,
		queryKey: appKeys.healthcheck,
		onError: toaster.onQueryError,
	})
}
