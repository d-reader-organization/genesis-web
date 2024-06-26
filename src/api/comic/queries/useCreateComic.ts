import { COMIC_QUERY_KEYS } from '@/api/comic/comicKeys'
import { useToaster } from '@/providers/ToastProvider'
import { BasicComic, CreateComicData } from '@/models/comic'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { COMIC, CREATE } = COMIC_QUERY_KEYS

const createComic = async (request: CreateComicData): Promise<BasicComic> => {
	const response = await http.post<BasicComic>(`${COMIC}/${CREATE}`, request)
	return response.data
}

export const useCreateComic = () => {
	const toaster = useToaster()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (request: CreateComicData) => createComic(request),
		onSuccess: () => {
			toaster.add('Comic created! 🎉', 'success')
			queryClient.invalidateQueries([COMIC_QUERY_KEYS.COMIC, COMIC_QUERY_KEYS.GET_RAW])
		},
		onError: toaster.onQueryError,
	})
}
