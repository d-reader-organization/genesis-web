'use server'

import { fetchWrapper } from '../../fetchWrapper'
import { INVEST_QUERY_KEYS } from '@/api/invest'
import { ExpressInterest } from '@/models/project'

const { INVEST, EXPRESS_INTEREST } = INVEST_QUERY_KEYS

export const expressInterest = async ({
  id,
  request,
}: {
  id: string | number
  request: ExpressInterest
}): Promise<void> => {
  await fetchWrapper<void>({
    path: `${INVEST}/${EXPRESS_INTEREST}/${id}`,
    body: request,
    method: 'POST',
  })
}
