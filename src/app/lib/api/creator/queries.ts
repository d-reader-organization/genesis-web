import { Creator } from '@/models/creator'
import { CreatorParams } from '@/models/creator/creatorParams'
import { fetchWrapper } from '../../fetchWrapper'
import { CREATOR_QUERY_KEYS } from '@/api/creator/creatorKeys'

const { CREATOR, GET: GET_CREATOR } = CREATOR_QUERY_KEYS

export const fetchCreators = async (params: CreatorParams): Promise<Creator[]> => {
  const { data } = await fetchWrapper<Creator[]>({ params, path: `${CREATOR}/${GET_CREATOR}` })
  return data ?? []
}
