import { PROJECTS } from '@/constants/projects'
import { Nullable } from '@/models/common'
import { getTwitterIntentExpressedInterest } from '@/utils/helpers'

export const fetchTwitterIntentExpressedInterest = (
  slug: string
): { data: Nullable<string>; errorMessage?: string } => {
  const project = PROJECTS.find((project) => project.slug === slug)
  if (!project) {
    return { data: null, errorMessage: `Project with slug ${slug} not found` }
  }

  const twitterIntent = getTwitterIntentExpressedInterest(project)
  return { data: twitterIntent }
}
