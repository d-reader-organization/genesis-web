import { investSlides } from '@/app/lib/data/invest/carouselData'
import { highInterestProjects } from '@/app/lib/data/invest/projectsData'
import { InvestCarousel } from '@/components/invest/Carousel'
import { FaqSection } from '@/components/invest/Faq'
import { ProjectsSection } from '@/components/invest/ProjectsSection'
import { InvestSection } from '@/components/invest/Section'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { InvestScreenWelcomeDialog } from '@/components/shared/dialogs/InvestScreenWelcomeDialog'
import { PROJECTS } from '@/constants/projects'
import { SuccessfulProject, isSuccessfulProject } from '@/models/project'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Genesis',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
  description:
    'Vote on new talent. Kickstart upcoming IP! Support creators which you feel have the potential to produce, direct & sell a captivating story.',
  keywords: 'NFT, asset, dReader, dPublisher, Comic, Solana, SOL, mint, collection, manga, manwha',
  openGraph: {
    type: 'website',
    title: 'Genesis',
    description:
      'Vote on new talent. Kickstart upcoming IP! Support creators which you feel have the potential to produce, direct & sell a captivating story.',
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
      'Vote on new talent. Kickstart upcoming IP! Support creators which you feel have the potential to produce, direct & sell a captivating story.',
    card: 'summary_large_image',
    site: '@GenesisApp',
    creator: '@GenesisApp',
    images: '/assets/images/metadata-invest.png',
  },
  manifest: '/manifest.json',
}

function fetchSuccessfulProjects(): SuccessfulProject[] {
  return PROJECTS.filter(isSuccessfulProject)
}

export default async function InvestPage() {
  const successfulProjects = fetchSuccessfulProjects()

  if (successfulProjects.length === 0) {
    return 'Projects not found'
  }

  return (
    <BaseLayout>
      <div className='flex flex-col gap-10 max-w-screen-xl w-full'>
        <InvestCarousel slides={investSlides} />
        <ProjectsSection projects={successfulProjects} title='Recent Successful Projects' />
        <InvestSection actionHref='/invest' data={highInterestProjects} title='Gauging Interest' />
        <FaqSection />
        <InvestScreenWelcomeDialog />
      </div>
    </BaseLayout>
  )
}
