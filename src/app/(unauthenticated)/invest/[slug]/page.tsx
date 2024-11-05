import { BaseLayout } from '@/components/layout/BaseLayout'
import { ProjectHeader } from '@/components/shared/ProjectHeader'
import { ProjectBanner } from '@/components/shared/ProjectBanner'
import { ProjectCreatorSection } from '@/components/shared/ProjectCreatorSection'
import { ProjectInfo } from '@/components/invest/ProjectInfo'
import { ProjectFundingCard } from '@/components/invest/ProjectFundingCard'
import { notFound } from 'next/navigation'
import { fetchProject } from '@/app/lib/api/invest/queries'
import { isAuthenticatedUser } from '@/app/lib/auth'

type Props = {
  params: { slug: string }
}

export default async function InvestPage({ params }: Props) {
  const { data: project, errorMessage } = await fetchProject(params.slug)
  const isAuthenticated = isAuthenticatedUser()

  if (errorMessage) {
    return notFound()
  }

  return (
    project && (
      <BaseLayout>
        <div className='flex flex-col max-w-screen-xl w-full'>
          <ProjectHeader title={project.title} subtitle={project.subtitle} className='max-md:hidden' />
          <div className='flex flex-col md:flex-row w-full h-full gap-6 md:gap-10'>
            <div className='flex flex-col w-full'>
              <ProjectBanner title={project.title} banner={project.banner} cover={project.cover} />
              <ProjectHeader title={project.title} subtitle={project.subtitle} className='md:hidden' />
              <ProjectFundingCard
                funding={project.funding}
                slug={project.slug}
                isAuthenticated={isAuthenticated}
                className='md:hidden'
              />
              <ProjectCreatorSection creator={project.creator} tags={project.tags} />
              <ProjectInfo info={project.info} />
            </div>
            <div className='flex flex-col'>
              <ProjectFundingCard
                funding={{ ...project.funding }}
                slug={project.slug}
                isAuthenticated={isAuthenticated}
                className='max-md:hidden'
              />
            </div>
          </div>
        </div>
      </BaseLayout>
    )
  )
}
