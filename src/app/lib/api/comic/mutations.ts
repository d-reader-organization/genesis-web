'use server'

import { COMIC_QUERY_KEYS } from '@/api/comic/comicKeys'
import { fetchWrapper } from '../../fetchWrapper'
import { RateComic } from '@/models/comic/rateComic'

const { COMIC, FAVOURITISE, RATE } = COMIC_QUERY_KEYS

export const rateComic = async ({ slug, request }: { slug: string; request: RateComic }): Promise<void> => {
  await fetchWrapper<void>({ path: `${COMIC}/${RATE}/${slug}`, body: request, method: 'PATCH' })
}

export const favouritiseComic = async (slug: string): Promise<void> => {
  await fetchWrapper<void>({ path: `${COMIC}/${FAVOURITISE}/${slug}`, method: 'PATCH' })
}
