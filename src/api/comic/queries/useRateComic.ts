import { COMIC_QUERY_KEYS, comicKeys } from '@/api/comic/comicKeys'
import { useToaster } from '@/providers/ToastProvider'
import { RateComic } from '@/models/comic/rateComic'
import { useMutation, useQueryClient } from 'react-query'
import { useFetchMe } from '@/api/creator'
import http from '@/api/http'

const { COMIC, RATE } = COMIC_QUERY_KEYS

const rateComic = async (slug: string, request: RateComic): Promise<void> => {
	const response = await http.patch<void>(`${COMIC}/${RATE}/${slug}`, request)
	return response.data
}

export const useRateComic = (slug: string) => {
	const toaster = useToaster()
	const { data: me } = useFetchMe()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (request: RateComic) => rateComic(slug, request),
		onSuccess: () => {
			toaster.add('Comic rated!', 'success')
			queryClient.invalidateQueries(comicKeys.get(slug))
			// queryClient.invalidateQueries(comicKeys.getMany())
			queryClient.invalidateQueries(comicKeys.getByOwner(me?.id || 0))
		},
		onError: toaster.onQueryError,
	})
}
