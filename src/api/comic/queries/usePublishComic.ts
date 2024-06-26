import { COMIC_QUERY_KEYS } from '@/api/comic/comicKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { COMIC, PUBLISH } = COMIC_QUERY_KEYS

const publishComic = async (slug: string): Promise<void> => {
	const response = await http.patch<void>(`${COMIC}/${PUBLISH}/${slug}`)
	return response.data
}

export const usePublishComic = (slug: string) => {
	const toaster = useToaster()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: () => publishComic(slug),
		onSuccess: () => {
			queryClient.invalidateQueries([COMIC_QUERY_KEYS.COMIC, COMIC_QUERY_KEYS.GET_RAW])
		},
		onError: toaster.onQueryError,
	})
}
