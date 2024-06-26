import { GENRE_QUERY_KEYS, genreKeys } from '@/api/genre/genreKeys'
import { useToaster } from '@/providers/ToastProvider'
import { Genre } from '@/models/genre'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { GENRE, UPDATE, ICON } = GENRE_QUERY_KEYS

const updateGenreIcon = async (slug: string, request: FormData): Promise<Genre> => {
	const response = await http.patch<Genre>(`${GENRE}/${UPDATE}/${slug}/${ICON}`, request)
	return response.data
}

export const useUpdateGenreIcon = (slug: string) => {
	const toaster = useToaster()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (request: FormData) => updateGenreIcon(slug, request),
		onSuccess: () => {
			toaster.add('Genre updated!', 'success')
			queryClient.invalidateQueries(genreKeys.getMany())
		},
		onMutate: toaster.uploadingFiles,
		onError: toaster.onQueryError,
	})
}
