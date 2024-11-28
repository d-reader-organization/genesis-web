import { PROJECTS } from '@/constants/projects'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { ProjectHeader } from '@/components/shared/ProjectHeader'
import { ProjectBanner } from '@/components/shared/ProjectBanner'
import { ProjectSummary } from '@/components/payout/ProjectSummary'
import { SuccessfulProject, isSuccessfulProject } from '@/models/project'
import { ProjectPayoutCard } from '@/components/payout/ProjectPayoutCard'
import { ProjectCreatorSection } from '@/components/shared/ProjectCreatorSection'
import { notFound } from 'next/navigation'

type Props = {
  params: { slug: string }
}

function fetchSuccessfulProject(slug: string): SuccessfulProject | undefined {
  const project = PROJECTS.find((project) => project.slug === slug)

  return isSuccessfulProject(project) ? project : undefined
}

export default async function PayoutPage({ params }: Props) {
  const project = fetchSuccessfulProject(params.slug)

  if (!project) {
    return notFound
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
              payout={project.payout}
              raiseGoal={project.funding.raiseGoal}
              numberOfBackers={project.funding.numberOfBackers}
              className='md:hidden'
            />
            <ProjectCreatorSection creator={project.creator} tags={project.tags} />
            <ProjectSummary summary={project.payout.summary} />
          </div>
          <div className='flex flex-col'>
            <ProjectPayoutCard
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
