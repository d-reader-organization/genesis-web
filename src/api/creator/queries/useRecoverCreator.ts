import { CREATOR_QUERY_KEYS } from '@/api/creator/creatorKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { CREATOR, RECOVER } = CREATOR_QUERY_KEYS

const recoverCreator = async (slug: string): Promise<void> => {
	const response = await http.patch<void>(`${CREATOR}/${RECOVER}/${slug}`)
	return response.data
}

export const useRecoverCreator = (slug: string) => {
	const toaster = useToaster()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: () => recoverCreator(slug),
		onSuccess: () => {
			toaster.add('Account recovered!', 'success')
			queryClient.invalidateQueries([CREATOR_QUERY_KEYS.CREATOR, CREATOR_QUERY_KEYS.GET])
		},
		onError: toaster.onQueryError,
	})
}
