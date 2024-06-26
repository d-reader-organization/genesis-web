import { creatorAuthKeys, AUTH_QUERY_KEYS } from '@/api/auth/authKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { AUTH, CREATOR, VALIDATE_NAME } = AUTH_QUERY_KEYS

const fetchValidateCreatorName = async (name: string): Promise<void> => {
	const response = await http.get<void>(`${AUTH}/${CREATOR}/${VALIDATE_NAME}/${name}`)
	return response.data
}

export const useFetchValidateCreatorName = (name: string) => {
	const toaster = useToaster()

	return useQuery({
		queryFn: () => fetchValidateCreatorName(name),
		queryKey: creatorAuthKeys.validateName(name),
		onError: toaster.onQueryError,
	})
}
