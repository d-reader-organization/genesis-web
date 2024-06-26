import { COMIC_QUERY_KEYS, comicKeys } from '@/api/comic/comicKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useMutation, useQueryClient } from 'react-query'
import { useFetchMe } from '@/api/creator'
import http from '@/api/http'

const { COMIC, FAVOURITISE } = COMIC_QUERY_KEYS

const favouritiseComic = async (slug: string): Promise<void> => {
	const response = await http.patch<void>(`${COMIC}/${FAVOURITISE}/${slug}`)
	return response.data
}

export const useFavouritiseComic = (slug: string) => {
	const toaster = useToaster()
	const { data: me } = useFetchMe()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: () => favouritiseComic(slug),
		onSuccess: () => {
			queryClient.invalidateQueries(comicKeys.get(slug))
			queryClient.invalidateQueries(comicKeys.getByOwner(me?.id || 0))
		},
		onError: toaster.onQueryError,
	})
}
