import { CREATOR_QUERY_KEYS, creatorKeys } from '@/api/creator/creatorKeys'
import { useToaster } from '@/providers/ToastProvider'
import { BasicCreator, UpdateCreatorData } from '@/models/creator'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { CREATOR, UPDATE } = CREATOR_QUERY_KEYS

const updateCreator = async (slug: string, request: UpdateCreatorData): Promise<BasicCreator> => {
	const response = await http.patch<BasicCreator>(`${CREATOR}/${UPDATE}/${slug}`, request)
	return response.data
}

export const useUpdateCreator = (slug: string) => {
	const toaster = useToaster()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (updateData: UpdateCreatorData) => updateCreator(slug, updateData),
		onSuccess: () => {
			toaster.add('Account updated!', 'success')
			queryClient.invalidateQueries(creatorKeys.getMe)
			queryClient.invalidateQueries(creatorKeys.get(slug))
		},
		onError: toaster.onQueryError,
	})
}
