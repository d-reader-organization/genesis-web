import { GenreParams } from '@/models/genre/genreParams'

export const GENRE_QUERY_KEYS = Object.freeze({
  GENRE: 'genre',
  GET: 'get',
})

export const genreKeys = Object.freeze({
  get: (params: GenreParams) => [GENRE_QUERY_KEYS.GENRE, GENRE_QUERY_KEYS.GET, params.skip, params.take],
})
