import { BaseLayout } from '@/components/layout/BaseLayout'
import { ProjectHeader } from '@/components/shared/ProjectHeader'
import { ProjectBanner } from '@/components/shared/ProjectBanner'
import { ProjectCreatorSection } from '@/components/shared/ProjectCreatorSection'
import { ProjectFundingCard } from '@/components/invest/ProjectFundingCard'
import { ProjectInfo } from '@/components/invest/ProjectInfo'
import { PROJECTS, Project } from '@/constants/projects'

type Props = {
  params: { slug: string }
}

function fetchProjectBySlug(slug: string): Project {
  const project = PROJECTS.find((project) => project.metadata.slug === slug)

  if (!project) {
    throw new Error('Project with slug ' + slug + ' not found')
  }

  return project
}

export default async function InvestPage({ params }: Props) {
  const project: Project = fetchProjectBySlug(params.slug)

  return (
    <BaseLayout>
      <div className='flex flex-col max-w-screen-xl w-full'>
        <ProjectHeader title={project.metadata.title} subtitle={project.metadata.subtitle} className='max-md:hidden' />
        <div className='flex flex-col md:flex-row w-full h-full gap-6 md:gap-10'>
          <div className='flex flex-col w-full'>
            <ProjectBanner
              title={project.metadata.title}
              banner={project.metadata.images.banner}
              cover={project.metadata.images.cover}
            />
            <ProjectHeader title={project.metadata.title} subtitle={project.metadata.subtitle} className='md:hidden' />
            <ProjectFundingCard funding={project.fundingInfo} className='md:hidden' />
            <ProjectCreatorSection creator={project.creator} tags={project.metadata.tags} />
            <ProjectInfo info={project.projectInfo} />
          </div>
          <div className='flex flex-col'>
            <ProjectFundingCard funding={project.fundingInfo} className='max-md:hidden' />
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
