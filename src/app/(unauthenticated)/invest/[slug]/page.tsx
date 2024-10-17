import { BaseLayout } from '@/components/layout/BaseLayout'
import { ProjectHeader } from '@/components/invest/ProjectHeader'
import { ProjectInfo } from '@/components/invest/ProjectInfo'
import { ProjectCreatorSection } from '@/components/invest/ProjectCreatorSection'
import { ProjectFunding } from '@/components/invest/ProjectFunding'
import { ProjectBanner } from '@/components/invest/ProjectBanner'
import { PROJECTS, Project } from '@/constants/projects'

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
  const project: Project = fetchProjectBySlug(params.slug)

  return (
    <BaseLayout>
      <div className='flex flex-col max-w-screen-xl w-full'>
        <ProjectHeader title={project.title} subtitle={project.subtitle} className='max-md:hidden' />
        <div className='flex flex-col md:flex-row w-full h-full gap-6 md:gap-10'>
          <div className='flex flex-col w-full'>
            <ProjectBanner title={project.title} banner={project.banner} />
            <ProjectHeader title={project.title} subtitle={project.subtitle} className='md:hidden' />
            <ProjectFunding info={project.fundingInfo} className='md:hidden' />
            <ProjectCreatorSection creator={project.creator} tags={project.tags} />
            <ProjectInfo details={project.details} />
          </div>
          <div className='flex flex-col'>
            <ProjectFunding info={project.fundingInfo} className='max-md:hidden' />
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
