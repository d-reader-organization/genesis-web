'use server'

import { fetchWrapper } from '../../fetchWrapper'
import { INVEST_QUERY_KEYS } from '@/api/invest'
import { ExpressInterest } from '@/models/project'
import { findProjectBySlug } from '@/utils/helpers'

const { INVEST, EXPRESS_INTEREST } = INVEST_QUERY_KEYS

export const expressInterest = async ({
  slug,
  request,
}: {
  slug: string
  request: ExpressInterest
}): Promise<{ errorMessage?: string }> => {
  const project = findProjectBySlug(slug)
  if (!project) {
    return { errorMessage: `Project with slug ${slug} does not exists` }
  }
  const response = await fetchWrapper<void>({
    path: `${INVEST}/${EXPRESS_INTEREST}/${project.id}`,
    body: request,
    method: 'POST',
  })

  return { errorMessage: response.errorMessage }
}
