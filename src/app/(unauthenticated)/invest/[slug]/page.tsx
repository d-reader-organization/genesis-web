import { BaseLayout } from '@/components/layout/BaseLayout'
import { ProjectHeader } from '@/components/shared/ProjectHeader'
import { ProjectBanner } from '@/components/shared/ProjectBanner'
import { ProjectCreatorSection } from '@/components/shared/ProjectCreatorSection'
import { ProjectInfo } from '@/components/invest/ProjectInfo'
import { ProjectFundingCard } from '@/components/invest/ProjectFundingCard'
import { notFound } from 'next/navigation'
import { fetchProject, fetchUserInterestedReceipts } from '@/app/lib/api/invest/queries'
import { ProjectInvestDialog } from '@/components/shared/dialogs/ProjectInvestDialog'
import { InterestUpdatesCard } from '@/components/invest/InterestUpdatesCard'
import { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

export const metadata: Metadata = {
  title: 'Genesis',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
  description:
    'Vote on new talent. back breakthrough stories! Support creators which you feel have the potential to produce, direct & sell a captivating story.',
  keywords: 'NFT, asset, dReader, dPublisher, Comic, Solana, SOL, mint, collection, manga, manwha',
  openGraph: {
    type: 'website',
    title: 'Genesis',
    description:
      'Vote on new talent. back breakthrough stories! Support creators which you feel have the potential to produce, direct & sell a captivating story.',
    images: '/assets/images/metadata-invest.png',
    url: process.env.NEXT_PUBLIC_SITE_URL + '/invest',
    siteName: 'Genesis',
  },
  appleWebApp: {
    title: 'Genesis',
    startupImage: '/assets/apple-touch-icon.png',
  },
  twitter: {
    title: 'Genesis',
    description:
      'Vote on new talent. back breakthrough stories! Support creators which you feel have the potential to produce, direct & sell a captivating story.',
    card: 'summary_large_image',
    site: '@GenesisApp',
    creator: '@GenesisApp',
    images: '/assets/images/metadata-invest.png',
  },
  manifest: '/manifest.json',
}

export default async function ProjectInvestPage({ params }: Props) {
  const { data: project, errorMessage } = await fetchProject(params.slug)

  if (!project || errorMessage) {
    return notFound()
  }

  const receipts = await fetchUserInterestedReceipts(project.slug)

  return (
    <BaseLayout showFooter>
      <div className='flex flex-col max-w-screen-xl w-full'>
        <ProjectHeader title={project.title} subtitle={project.subtitle} className='max-md:hidden' />
        <div className='flex flex-col md:flex-row w-full h-full gap-6 md:gap-10'>
          <div className='flex flex-col w-full'>
            <ProjectBanner
              title={project.title}
              banner={project.banner}
              cover={project.cover}
              videoUrl={project.videoUrl}
            />
            <ProjectHeader title={project.title} subtitle={project.subtitle} className='md:hidden' />
            <ProjectFundingCard funding={project.funding} slug={project.slug} className='md:hidden' />
            <ProjectCreatorSection creator={project.creator} tags={project.tags} />
            <InterestUpdatesCard className='md:hidden -ml-4 w-screen rounded-none' receipts={receipts} />
            <ProjectInfo info={project.info} />
          </div>
          <div className='flex flex-col'>
            <ProjectFundingCard funding={{ ...project.funding }} slug={project.slug} className='max-md:hidden' />
            <InterestUpdatesCard className='max-md:hidden' receipts={receipts} />
          </div>
        </div>
      </div>
      <ProjectInvestDialog />
    </BaseLayout>
  )
}
