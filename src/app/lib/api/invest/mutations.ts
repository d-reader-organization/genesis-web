'use server'

import { fetchWrapper } from '../../fetchWrapper'
import { INVEST_QUERY_KEYS } from '@/api/invest'
import { ExpressInterest } from '@/models/project'

const { INVEST, EXPRESS_INTEREST } = INVEST_QUERY_KEYS

export const expressInterest = async ({
  slug,
  request,
}: {
  slug: string
  request: ExpressInterest
}): Promise<{ errorMessage?: string }> => {
  const response = await fetchWrapper<void>({
    path: `${INVEST}/${EXPRESS_INTEREST}/${slug}`,
    body: request,
    method: 'POST',
  })

  return { errorMessage: response.errorMessage }
}
