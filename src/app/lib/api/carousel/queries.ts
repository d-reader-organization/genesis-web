import { CAROUSEL_QUERY_KEYS } from '@/api/carousel/carouselKeys'
import { fetchWrapper } from '../../fetchWrapper'

const { CAROUSEL, SLIDES, GET: GET_SLIDES } = CAROUSEL_QUERY_KEYS

export const fetchCarouselSlides = async () => {
  const response = await fetchWrapper({ path: `${CAROUSEL}/${SLIDES}/${GET_SLIDES}` })
  return response.json()
}
