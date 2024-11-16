import { fetchWrapper } from '../../fetchWrapper'
import { CarouselSlide } from '@/models/carousel/carouselSlide'

export const fetchCarouselSlides = async (): Promise<CarouselSlide[]> => {
  const { data } = await fetchWrapper<CarouselSlide[]>({ path: `carousel/slides/get`, revalidateCacheInSeconds: 60 })
  return data ?? []
}
