import { BaseLayout } from '@/components/layout/BaseLayout'
import { ProjectHeader } from '@/components/shared/ProjectHeader'
import { ProjectBanner } from '@/components/shared/ProjectBanner'
import { ProjectCreatorSection } from '@/components/shared/ProjectCreatorSection'
import { ProjectFundingCard } from '@/components/invest/ProjectFundingCard'
import { ProjectInfo } from '@/components/invest/ProjectInfo'
import { PROJECTS } from '@/constants/projects'
import { Project } from '@/models/project'

type Props = {
  params: { slug: string }
}

function fetchProjectBySlug(slug: string): Project {
  const project = PROJECTS.find((project) => project.slug === slug)

  if (!project) {
    throw new Error('Project with slug ' + slug + ' not found')
  }

  return project
}

export default async function InvestPage({ params }: Props) {
  const project = fetchProjectBySlug(params.slug)

  return (
    <BaseLayout>
      <div className='flex flex-col max-w-screen-xl w-full'>
        <ProjectHeader title={project.title} subtitle={project.subtitle} className='max-md:hidden' />
        <div className='flex flex-col md:flex-row w-full h-full gap-6 md:gap-10'>
          <div className='flex flex-col w-full'>
            <ProjectBanner title={project.title} banner={project.banner} cover={project.cover} />
            <ProjectHeader title={project.title} subtitle={project.subtitle} className='md:hidden' />
            <ProjectFundingCard funding={project.funding} className='md:hidden' />
            <ProjectCreatorSection creator={project.creator} tags={project.tags} />
            <ProjectInfo info={project.info} />
          </div>
          <div className='flex flex-col'>
            <ProjectFundingCard funding={project.funding} className='max-md:hidden' />
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
