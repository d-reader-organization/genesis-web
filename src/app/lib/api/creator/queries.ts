import { Creator } from '@/models/creator'
import { CreatorParams } from '@/models/creator/creatorParams'
import { fetchWrapper } from '../../fetchWrapper'
import { CREATOR_QUERY_KEYS } from '@/api/creator/creatorKeys'
import { Nullable } from '@/models/common'

const { CREATOR, GET } = CREATOR_QUERY_KEYS

export const fetchCreator = async (slug: string): Promise<Nullable<Creator>> => {
  const response = await fetchWrapper<Creator>({ path: `${CREATOR}/${GET}/${slug}` })
  return response.data
}

export const fetchCreators = async (params: CreatorParams): Promise<Creator[]> => {
  const { data } = await fetchWrapper<Creator[]>({ params, path: `${CREATOR}/${GET}` })
  return data ?? []
}
