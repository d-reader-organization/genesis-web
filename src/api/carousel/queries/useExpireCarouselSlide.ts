import { CAROUSEL_QUERY_KEYS, carouselKeys } from '@/api/carousel/carouselKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { CAROUSEL, SLIDES, EXPIRE } = CAROUSEL_QUERY_KEYS

const expireCarouselSlide = async (id: string | number): Promise<void> => {
  const response = await http.patch<void>(`${CAROUSEL}/${SLIDES}/${EXPIRE}/${id}`)
  return response.data
}

export const useExpireCarouselSlide = (id: string | number) => {
  const toaster = useToaster()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => expireCarouselSlide(id),
    onSuccess: () => {
      toaster.add('Carousel slide deprecated! 🎉', 'success')
      queryClient.invalidateQueries(carouselKeys.getMany)
    },
    onError: toaster.onQueryError,
  })
}
