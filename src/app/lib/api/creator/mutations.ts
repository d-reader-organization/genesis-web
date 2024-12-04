'use server'

import { CREATOR_QUERY_KEYS } from '@/api/creator/creatorKeys'
import { fetchWrapper } from '../../fetchWrapper'

const { CREATOR, FOLLOW } = CREATOR_QUERY_KEYS

export const followCreator = async (slug: string): Promise<void> => {
  await fetchWrapper<void>({ path: `${CREATOR}/${FOLLOW}/${slug}`, method: 'PATCH', isTextResponse: true })
}
