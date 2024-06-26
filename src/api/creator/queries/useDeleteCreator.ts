import { CREATOR_QUERY_KEYS } from '@/api/creator/creatorKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { CREATOR, DELETE } = CREATOR_QUERY_KEYS

const deleteCreator = async (slug: string): Promise<void> => {
	const response = await http.patch<void>(`${CREATOR}/${DELETE}/${slug}`)
	return response.data
}

export const useDeleteCreator = (slug: string) => {
	const toaster = useToaster()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: () => deleteCreator(slug),
		onSuccess: () => {
			toaster.add('Account deleted!', 'success')
			queryClient.invalidateQueries([CREATOR_QUERY_KEYS.CREATOR, CREATOR_QUERY_KEYS.GET])
		},
		onError: toaster.onQueryError,
	})
}
