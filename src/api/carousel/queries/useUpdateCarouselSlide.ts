import { CAROUSEL_QUERY_KEYS, carouselKeys } from '@/api/carousel/carouselKeys'
import { useToaster } from '@/providers/ToastProvider'
import { CarouselSlide, UpdateCarouselSlideData } from '@/models/carousel/carouselSlide'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { CAROUSEL, SLIDES, UPDATE } = CAROUSEL_QUERY_KEYS

const updateCarouselSlide = async (id: string | number, request: UpdateCarouselSlideData): Promise<CarouselSlide> => {
  const response = await http.patch<CarouselSlide>(`${CAROUSEL}/${SLIDES}/${UPDATE}/${id}`, request)
  return response.data
}

export const useUpdateCarouselSlide = (id: string | number) => {
  const toaster = useToaster()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: UpdateCarouselSlideData) => updateCarouselSlide(id, request),
    onSuccess: () => {
      toaster.add('Carousel slide udpated! 🎉', 'success')
      queryClient.invalidateQueries(carouselKeys.getMany)
    },
    onError: toaster.onQueryError,
  })
}
