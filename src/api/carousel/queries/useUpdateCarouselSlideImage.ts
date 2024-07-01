import { CAROUSEL_QUERY_KEYS, carouselKeys } from '@/api/carousel/carouselKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { CAROUSEL, SLIDES, UPDATE, IMAGE } = CAROUSEL_QUERY_KEYS

const updateCarouselSlideImage = async (id: string | number, request: FormData): Promise<void> => {
  const response = await http.patch<void>(`${CAROUSEL}/${SLIDES}/${UPDATE}/${id}/${IMAGE}`, request)
  return response.data
}

export const useUpdateCarouselSlideImage = (id: string | number) => {
  const toaster = useToaster()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (updateData: FormData) => updateCarouselSlideImage(id, updateData),
    onSuccess: () => {
      toaster.add('Slide image updated!', 'success')
      queryClient.invalidateQueries(carouselKeys.getMany)
    },
    onError: toaster.onQueryError,
  })
}
