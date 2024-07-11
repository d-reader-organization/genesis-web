import { COMIC_QUERY_KEYS } from '@/api/comic/comicKeys'
import { Comic } from '@/models/comic'
import { ComicParams } from '@/models/comic/comicParams'
import { fetchWrapper } from '../../fetchWrapper'

const { COMIC, GET } = COMIC_QUERY_KEYS

export const fetchComics = async (params: ComicParams): Promise<Comic[]> => {
  const { data } = await fetchWrapper<Comic[]>({
    params,
    path: `${COMIC}/${GET}`,
  })
  return data ?? []
}

export const fetchComic = async (slug: string): Promise<Comic | null> => {
  const { data } = await fetchWrapper<Comic>({
    path: `${COMIC}/${GET}/${slug}`,
  })

  return data
}
