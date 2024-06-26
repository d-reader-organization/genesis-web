import { appKeys, APP_QUERY_KEYS } from '@/api/app/appKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { APP, HELLO } = APP_QUERY_KEYS

const fetchHello = async (): Promise<string> => {
	const response = await http.get<string>(`${APP}/${HELLO}`)
	return response.data
}

export const useFetchHello = () => {
	const toaster = useToaster()

	return useQuery({
		queryFn: fetchHello,
		queryKey: appKeys.hello,
		onError: toaster.onQueryError,
	})
}
