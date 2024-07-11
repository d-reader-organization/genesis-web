import { CAROUSEL_QUERY_KEYS } from '@/api/carousel/carouselKeys'
import { fetchWrapper } from '../../fetchWrapper'
import { CarouselSlide } from '@/models/carousel/carouselSlide'

const { CAROUSEL, SLIDES, GET: GET_SLIDES } = CAROUSEL_QUERY_KEYS

export const fetchCarouselSlides = async (): Promise<CarouselSlide[]> => {
  const { data } = await fetchWrapper<CarouselSlide[]>({ path: `${CAROUSEL}/${SLIDES}/${GET_SLIDES}` })
  return data ?? []
}
