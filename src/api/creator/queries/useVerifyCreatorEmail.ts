import { CREATOR_QUERY_KEYS, creatorKeys } from '@/api/creator/creatorKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useMutation, useQueryClient } from 'react-query'
import { BasicCreator } from '@/models/creator'
import http from '@/api/http'

const { CREATOR, VERIFY_EMAIL } = CREATOR_QUERY_KEYS

const verifyCreatorEmail = async (verificationToken: string): Promise<BasicCreator> => {
	const response = await http.patch<BasicCreator>(`${CREATOR}/${VERIFY_EMAIL}/${verificationToken}`)
	return response.data
}

export const useVerifyCreatorEmail = () => {
	const toaster = useToaster()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (verificationToken: string) => verifyCreatorEmail(verificationToken),
		onSuccess: () => {
			toaster.add('Email address verified!', 'success')
			queryClient.invalidateQueries(creatorKeys.getMe)
		},
		onError: toaster.onQueryError,
	})
}
