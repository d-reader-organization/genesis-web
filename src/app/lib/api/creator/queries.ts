'use server'

import { Creator, SearchResultCreator } from '@/models/creator'
import { CreatorParams } from '@/models/creator/creatorParams'
import { fetchWrapper } from '../../fetchWrapper'
import { CREATOR_QUERY_KEYS } from '@/api/creator/creatorKeys'
import { Nullable } from '@/models/common'

const { CREATOR, GET, SEARCH } = CREATOR_QUERY_KEYS

export const fetchCreator = async (slug: string): Promise<Nullable<Creator>> => {
  const response = await fetchWrapper<Creator>({ path: `${CREATOR}/${GET}/${slug}`, revalidateCacheInSeconds: 5 * 60 })
  return response.data
}

export const fetchCreators = async (params: CreatorParams): Promise<Creator[]> => {
  const { data } = await fetchWrapper<Creator[]>({
    params,
    path: `${CREATOR}/${GET}`,
    revalidateCacheInSeconds: 15 * 60,
  })
  return data ?? []
}

export const searchCreators = async (params: CreatorParams): Promise<SearchResultCreator[]> => {
  const { data } = await fetchWrapper<SearchResultCreator[]>({
    params,
    path: `${CREATOR}/${SEARCH}`,
  })
  return data ?? []
}