import { carouselKeys, CAROUSEL_QUERY_KEYS } from '@/api/carousel/carouselKeys'
import { useToaster } from '@/providers/ToastProvider'
import { CarouselSlide } from '@/models/carousel/carouselSlide'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { CAROUSEL, SLIDES, GET } = CAROUSEL_QUERY_KEYS

const fetchCarouselSlide = async (id: string | number): Promise<CarouselSlide> => {
  const response = await http.get<CarouselSlide>(`${CAROUSEL}/${SLIDES}/${GET}/${id}`)
  return response.data
}

export const useFetchCarouselSlide = (id: string | number) => {
  const toaster = useToaster()

  return useQuery({
    queryFn: () => fetchCarouselSlide(id),
    queryKey: carouselKeys.get(id),
    staleTime: 1000 * 60 * 10, // stale for 10 minutes
    onError: toaster.onQueryError,
  })
}
