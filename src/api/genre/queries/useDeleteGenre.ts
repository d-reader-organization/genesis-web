import { GENRE_QUERY_KEYS } from '@/api/genre/genreKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { GENRE, DELETE } = GENRE_QUERY_KEYS

const deleteGenre = async (slug: string): Promise<void> => {
	const response = await http.delete<void>(`${GENRE}/${DELETE}/${slug}`)
	return response.data
}

export const useDeleteGenre = (slug: string) => {
	const toaster = useToaster()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: () => deleteGenre(slug),
		onSuccess: () => {
			toaster.add('Genre deleted!', 'success')
			queryClient.invalidateQueries([GENRE_QUERY_KEYS.GENRE, GENRE_QUERY_KEYS.GET])
		},
		onError: toaster.onQueryError,
	})
}
