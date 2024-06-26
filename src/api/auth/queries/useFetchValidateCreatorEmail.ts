import { creatorAuthKeys, AUTH_QUERY_KEYS } from '@/api/auth/authKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { AUTH, CREATOR, VALIDATE_EMAIL } = AUTH_QUERY_KEYS

const fetchValidateCreatorEmail = async (email: string): Promise<void> => {
	const response = await http.get<void>(`${AUTH}/${CREATOR}/${VALIDATE_EMAIL}/${email}`)
	return response.data
}

export const useFetchValidateCreatorEmail = (email: string) => {
	const toaster = useToaster()

	return useQuery({
		queryFn: () => fetchValidateCreatorEmail(email),
		queryKey: creatorAuthKeys.validateEmail(email),
		onError: toaster.onQueryError,
	})
}
