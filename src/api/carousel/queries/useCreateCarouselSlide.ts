import { CAROUSEL_QUERY_KEYS, carouselKeys } from '@/api/carousel/carouselKeys'
import { useToaster } from '@/providers/ToastProvider'
import { CarouselSlide } from '@/models/carousel/carouselSlide'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { CAROUSEL, SLIDES, CREATE } = CAROUSEL_QUERY_KEYS

// CreateCarouselSlideData
const createCarouselSlide = async (request: FormData): Promise<CarouselSlide> => {
	const response = await http.post<CarouselSlide>(`${CAROUSEL}/${SLIDES}/${CREATE}`, request)
	return response.data
}

export const useCreateCarouselSlide = () => {
	const toaster = useToaster()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (request: FormData) => createCarouselSlide(request),
		onSuccess: () => {
			toaster.add('Carousel slide created! 🎉', 'success')
			queryClient.invalidateQueries(carouselKeys.getMany)
		},
		onError: toaster.onQueryError,
	})
}
