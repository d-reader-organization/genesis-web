'use server'

import { fetchWrapper } from '../../fetchWrapper'
import { Nullable } from '@/models/common'
import { INVEST_QUERY_KEYS } from '@/api/invest'
import { isSuccessfulProject, Project, SuccessfulProject, UserProjectInterest } from '@/models/project'
import { PROJECTS } from '@/constants/projects'
import { findProjectBySlug } from '@/utils/helpers'

const { GET, INVEST } = INVEST_QUERY_KEYS

export const fetchSuccessfulProjects = async (): Promise<{
  data: Nullable<SuccessfulProject[]>
  errorMessage?: string
}> => {
  const { data: userProjectInterest, errorMessage } = await fetchWrapper<UserProjectInterest[]>({
    path: `${INVEST}/${GET}`,
  })

  if (errorMessage) {
    return { data: null, errorMessage }
  }

  const successfulProjects = PROJECTS.filter(isSuccessfulProject)
  const projects = successfulProjects.map((project) => ({
    ...project,
    funding: {
      ...project.funding,
      numberOfInterestedInvestors:
        userProjectInterest?.find((interest) => interest.slug === project.slug)?.countOfUserExpressedInterest ?? 0,
    },
  }))

  return { data: projects }
}

export const fetchProject = async (slug: string): Promise<{ data: Nullable<Project>; errorMessage?: string }> => {
  const project = findProjectBySlug(slug)
  if (!project) {
    return { data: null, errorMessage: `Project with slug ${slug} not found` }
  }

  const { data } = await fetchWrapper<UserProjectInterest>({
    path: `${INVEST}/${GET}/${slug}`,
  })

  if (!data) {
    return { data: null, errorMessage: `Project with slug ${slug} not found` }
  }

  return {
    data: {
      ...project,
      funding: {
        ...project.funding,
        numberOfInterestedInvestors: data.countOfUserExpressedInterest,
        isUserInterested: data.isUserInterested,
      },
    },
  }
}
