import { BaseLayout } from '@/components/layout/BaseLayout'
import { ProjectHeader } from '@/components/shared/ProjectHeader'
import { ProjectBanner } from '@/components/shared/ProjectBanner'
import { ProjectCreatorSection } from '@/components/shared/ProjectCreatorSection'
import { ProjectPayoutCard } from '@/components/payout/ProjectPayoutCard'
import { ProjectDescription } from '@/components/payout/ProjectDescription'
import { PROJECTS } from '@/constants/projects'
import { Project, SuccessfulProject } from '@/models/project'

type Props = {
  params: { slug: string }
}

function isSuccessfulProject(project: Project | undefined): project is SuccessfulProject {
  return project !== undefined && typeof project.slug === 'string'
}

function fetchProjectBySlug(slug: string): SuccessfulProject | undefined {
  const project = PROJECTS.find((project) => project.slug === slug)

  return isSuccessfulProject(project) ? project : undefined
}

export default async function PayoutPage({ params }: Props) {
  const project = fetchProjectBySlug(params.slug)

  if (!project) {
    return 'Project not found'
  }

  return (
    <BaseLayout>
      <div className='flex flex-col max-w-screen-xl w-full'>
        <ProjectHeader title={project.title} subtitle={project.subtitle} className='max-md:hidden' />
        <div className='flex flex-col md:flex-row w-full h-full gap-6 md:gap-8'>
          <div className='flex flex-col w-full '>
            <ProjectBanner title={project.title} banner={project.banner} cover={project.cover} />
            <ProjectHeader title={project.title} subtitle={project.subtitle} className='md:hidden' />
            <ProjectPayoutCard
              title={project.title}
              logo={project.logo}
              payout={project.payout}
              raiseGoal={project.funding.raiseGoal}
              numberOfBackers={project.funding.numberOfBackers}
              className='md:hidden'
            />
            <ProjectCreatorSection creator={project.creator} tags={project.tags} />
            <ProjectDescription description={project.payout.summary} />
          </div>
          <div className='flex flex-col'>
            <ProjectPayoutCard
              title={project.title}
              logo={project.logo}
              payout={project.payout}
              raiseGoal={project.funding.raiseGoal}
              numberOfBackers={project.funding.numberOfBackers}
              className='max-md:hidden'
            />
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
