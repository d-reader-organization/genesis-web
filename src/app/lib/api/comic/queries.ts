'use server'

import { COMIC_QUERY_KEYS } from '@/api/comic/comicKeys'
import { Comic } from '@/models/comic'
import { ComicParams } from '@/models/comic/comicParams'
import { fetchWrapper } from '../../fetchWrapper'

const { BY_OWNER, COMIC, FAVORITES, GET } = COMIC_QUERY_KEYS

export const fetchComics = async (params: ComicParams): Promise<Comic[]> => {
  const { data } = await fetchWrapper<Comic[]>({
    params,
    path: `${COMIC}/${GET}`,
    revalidateCacheInSeconds: 5 * 60,
  })
  return data ?? []
}

export const fetchComic = async (slug: string): Promise<Comic | null> => {
  const { data } = await fetchWrapper<Comic>({
    path: `${COMIC}/${GET}/${slug}`,
  })

  return data
}

export const fetchComicsByOwner = async ({
  params,
  userId,
}: {
  params: ComicParams
  userId: number
}): Promise<Comic[]> => {
  const { data } = await fetchWrapper<Comic[]>({
    params,
    path: `${COMIC}/${GET}/${BY_OWNER}/${userId}`,
    revalidateCacheInSeconds: 10,
  })

  return data ?? []
}

export const fetchFavoriteComics = async ({ params, userId }: { params: ComicParams; userId: number }) => {
  const response = await fetchWrapper<Comic[]>({
    params,
    path: `${COMIC}/${GET}/${FAVORITES}/${userId}`,
  })

  return response.data ?? []
}
