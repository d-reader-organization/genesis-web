import { BaseLayout } from '@/components/layout/BaseLayout'
import { ProjectHeader } from '@/components/shared/ProjectHeader'
import { ProjectBanner } from '@/components/shared/ProjectBanner'
import { ProjectCreatorSection } from '@/components/shared/ProjectCreatorSection'
import { ProjectPayoutCard } from '@/components/payout/ProjectPayoutCard'
import { ProjectDescription } from '@/components/payout/ProjectDescription'
import { PROJECTS, Project, PayoutInfo } from '@/constants/projects'

type Props = {
  params: { slug: string }
}

type PayoutProject = Omit<Project, 'payoutInfo'> & { payoutInfo: PayoutInfo }

function fetchProjectBySlug(slug: string): PayoutProject {
  const project = PROJECTS.find((project) => project.metadata.slug === slug)

  if (!project) {
    throw new Error('Project with slug ' + slug + ' not found')
  }

  return {
    ...project,
    payoutInfo: project.payoutInfo || {
      roiPercentage: 0,
      days: 0,
      description: '',
    },
  } as PayoutProject
}

export default async function PayoutPage({ params }: Props) {
  const project: PayoutProject = fetchProjectBySlug(params.slug)

  return (
    <BaseLayout>
      <div className='flex flex-col max-w-screen-xl w-full'>
        <ProjectHeader title={project.metadata.title} subtitle={project.metadata.subtitle} className='max-md:hidden' />
        <div className='flex flex-col md:flex-row w-full h-full gap-6 md:gap-8'>
          <div className='flex flex-col w-full '>
            <ProjectBanner
              title={project.metadata.title}
              banner={project.metadata.images.banner}
              cover={project.metadata.images.cover}
            />
            <ProjectHeader title={project.metadata.title} subtitle={project.metadata.subtitle} className='md:hidden' />
            <ProjectPayoutCard
              title={project.metadata.title}
              payoutInfo={project.payoutInfo}
              logo={project.metadata.images.logo}
              raiseGoal={project.fundingInfo.raiseGoal}
              numberOfBackers={project.fundingInfo.numberOfBackers}
              className='md:hidden'
            />
            <ProjectCreatorSection creator={project.creator} tags={project.metadata.tags} />
            <ProjectDescription description={project.payoutInfo.description} />
          </div>
          <div className='flex flex-col'>
            <ProjectPayoutCard
              title={project.metadata.title}
              payoutInfo={project.payoutInfo}
              logo={project.metadata.images.logo}
              raiseGoal={project.fundingInfo.raiseGoal}
              numberOfBackers={project.fundingInfo.numberOfBackers}
              className='max-md:hidden'
            />
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
