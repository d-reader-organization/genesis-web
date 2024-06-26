import { CREATOR_QUERY_KEYS } from '@/api/creator/creatorKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useMutation } from 'react-query'
import http from '@/api/http'

const { CREATOR, REQUEST_EMAIL_VERIFICATION } = CREATOR_QUERY_KEYS

const requestCreatorEmailVerification = async (): Promise<void> => {
	const response = await http.patch<void>(`${CREATOR}/${REQUEST_EMAIL_VERIFICATION}`)
	return response.data
}

export const useRequestCreatorEmailVerification = () => {
	const toaster = useToaster()

	return useMutation({
		mutationFn: () => requestCreatorEmailVerification(),
		onSuccess: () => {
			toaster.add('Verification email sent, check your inbox!', 'success')
		},
		onError: toaster.onQueryError,
	})
}
