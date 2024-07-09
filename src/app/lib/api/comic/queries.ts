import { COMIC_QUERY_KEYS } from '@/api/comic/comicKeys'
import { Comic } from '@/models/comic'
import { ComicParams } from '@/models/comic/comicParams'
import { fetchWrapper } from '../../fetchWrapper'

const { COMIC, GET: GET_COMICS } = COMIC_QUERY_KEYS

export const fetchComics = async (params: ComicParams): Promise<Comic[]> => {
  const response = await fetchWrapper({
    params,
    path: `${COMIC}/${GET_COMICS}`,
  })
  return response.json()
}
