'use server'

import { fetchWrapper } from '../../fetchWrapper'
import { Genre } from '@/models/genre-new'
import { GenreParams } from '@/models/genre-new/genreParams'
import { GENRE_QUERY_KEYS } from '@/api/genre/genreKeys'

const { GENRE, GET } = GENRE_QUERY_KEYS

export const fetchGenres = async (params: GenreParams): Promise<Genre[]> => {
  const { data } = await fetchWrapper<Genre[]>({
    params,
    path: `${GENRE}/${GET}`,
  })
  return data ?? []
}
