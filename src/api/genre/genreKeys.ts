import { Pagination } from '@/models/pagination'

export const GENRE_QUERY_KEYS = Object.freeze({
  GENRE: 'genre',
  GET: 'get',
  CREATE: 'create',
  UPDATE: 'update',
  ICON: 'icon',
  DELETE: 'delete',
  RECOVER: 'recover',
})

export const genreKeys = Object.freeze({
  getMany: (params?: Pagination) => [GENRE_QUERY_KEYS.GENRE, GENRE_QUERY_KEYS.GET, params?.skip, params?.take],
  get: (slug: string) => [GENRE_QUERY_KEYS.GENRE, GENRE_QUERY_KEYS.GET, slug],
})
