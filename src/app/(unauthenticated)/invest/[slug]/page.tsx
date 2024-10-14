import { BaseLayout } from '@/components/layout/BaseLayout'
import { ProjectHeader } from '@/components/invest/ProjectHeader'
import { ProjectFacts } from '@/components/invest/ProjectFacts'
import { ProjectCreator } from '@/components/invest/ProjectCreatorSection'
import { ProjectFunding } from '@/components/invest/ProjectFunding'
import { ProjectBanner } from '@/components/invest/ProjectBanner'
import { PROJECTS, Project } from '@/constants/projects'

type Props = {
  params: { slug: string }
}

function findProjectBySlug(slug: string): Project {
  const PROJECT = PROJECTS.find((project) => project.slug === slug)

  if (!PROJECT) {
    throw new Error('Project with slug ' + slug + ' not found')
  }

  return PROJECT
}

export default async function InvestPage({ params }: Props) {
  const PROJECT: Project = findProjectBySlug(params.slug)

  return (
    <BaseLayout>
      <div className='flex flex-col max-w-screen-xl w-full'>
        <ProjectHeader title={PROJECT.title} subtitle={PROJECT.subtitle} className='max-md:hidden' />
        <div className='flex flex-col md:flex-row w-full h-full gap-6 md:gap-10'>
          <div className='flex flex-col w-full'>
            <ProjectBanner title={PROJECT.title} banner={PROJECT.banner} />
            <ProjectHeader title={PROJECT.title} subtitle={PROJECT.subtitle} className='md:hidden' />
            <ProjectFunding fundingDetails={PROJECT.fundingDetails} className='md:hidden' />
            <div className='w-full'>
              <ProjectCreator creator={PROJECT.creator} tags={PROJECT.tags} />
              <ProjectFacts facts={PROJECT.facts} />
            </div>
          </div>
          <div className='flex flex-col'>
            <ProjectFunding fundingDetails={PROJECT.fundingDetails} className='max-md:hidden' />
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
