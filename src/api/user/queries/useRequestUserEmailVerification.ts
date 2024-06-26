import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useMutation } from 'react-query'
import http from '@/api/http'

const { USER, REQUEST_EMAIL_VERIFICATION } = USER_QUERY_KEYS

const requestUserEmailVerification = async (): Promise<void> => {
	const response = await http.patch<void>(`${USER}/${REQUEST_EMAIL_VERIFICATION}`)
	return response.data
}

export const useRequestUserEmailVerification = () => {
	const toaster = useToaster()

	return useMutation({
		mutationFn: () => requestUserEmailVerification(),
		onSuccess: () => {
			toaster.add('Verification email sent, check your inbox!', 'success')
		},
		onError: toaster.onQueryError,
	})
}
