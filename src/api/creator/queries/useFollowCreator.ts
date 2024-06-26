import { CREATOR_QUERY_KEYS, creatorKeys } from '@/api/creator/creatorKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { CREATOR, FOLLOW } = CREATOR_QUERY_KEYS

const followCreator = async (slug: string): Promise<void> => {
	const response = await http.patch<void>(`${CREATOR}/${FOLLOW}/${slug}`)
	return response.data
}

export const useFollowCreator = (slug: string) => {
	const toaster = useToaster()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: () => followCreator(slug),
		onSuccess: () => {
			toaster.add('Creator followed!', 'success')
			queryClient.invalidateQueries(creatorKeys.get(slug))
			// queryClient.invalidateQueries([CREATOR_QUERY_KEYS.CREATOR, CREATOR_QUERY_KEYS.GET])
			queryClient.invalidateQueries({
				predicate: (query) => {
					return (
						query.queryKey[0] === CREATOR_QUERY_KEYS.CREATOR &&
						query.queryKey[1] === CREATOR_QUERY_KEYS.GET &&
						query.queryKey[2] !== CREATOR_QUERY_KEYS.ME // no need to invalidate /me endpoint
					)
				},
			})
		},
		onError: toaster.onQueryError,
	})
}
