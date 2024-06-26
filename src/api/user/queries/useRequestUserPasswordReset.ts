import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useMutation } from 'react-query'
import { RequestPasswordResetParams } from '@/models/user/requestPasswordResetParams'
import http from '@/api/http'

const { USER, REQUEST_PASSWORD_RESET } = USER_QUERY_KEYS

const requestUserPasswordReset = async (params: RequestPasswordResetParams): Promise<void> => {
	const response = await http.patch<void>(`${USER}/${REQUEST_PASSWORD_RESET}`, params)
	return response.data
}

export const useRequestUserPasswordReset = () => {
	const toaster = useToaster()

	return useMutation({
		mutationFn: (params: RequestPasswordResetParams) => requestUserPasswordReset(params),
		onSuccess: () => {
			toaster.add('Password reset instructions sent to your inbox!', 'success')
		},
		onError: toaster.onQueryError,
	})
}
