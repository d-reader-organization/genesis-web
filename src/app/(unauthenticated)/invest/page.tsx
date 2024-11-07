import { fetchSuccessfulProjects } from '@/app/lib/api/invest/queries'
import { investSlides } from '@/app/lib/data/invest/carouselData'
import { highInterestProjects } from '@/app/lib/data/invest/projectsData'
import { InvestCarousel } from '@/components/invest/Carousel'
import { FaqSection } from '@/components/invest/Faq'
import { ProjectsSection } from '@/components/invest/ProjectsSection'
import { InvestSection } from '@/components/invest/Section'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Text } from '@/components/ui'
import { GenesisExplainSlide } from '@/components/invest/GensisExplainSlide'

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

export default async function InvestPage() {
  const { data: successfulProjects, errorMessage } = await fetchSuccessfulProjects()

  if (errorMessage) {
    notFound()
  }

  return (
    successfulProjects && (
      <>
        <GenesisExplainSlide />
        <BaseLayout showFooter>
          <div className='md:hidden flex flex-col justify-center items-center gap-2 pb-16 px-8 pl-2 text-center'>
            <Text as='h3' styleVariant='primary-heading'>
              Scout & Invest into the future of storytelling
            </Text>
            <Text as='p' styleVariant='body-large'>
              Join the community of investors by supporting original stories that will change the world.
            </Text>
          </div>
          <div className='flex flex-col gap-10 max-w-screen-xl w-full'>
            <InvestSection data={highInterestProjects} title='Gauging Interest' />
            <ProjectsSection projects={successfulProjects} title='Recent Successful Projects' />
            <InvestCarousel slides={investSlides} />
            <InvestSection data={highInterestProjects} title='You Might Like' />
            <FaqSection />
          </div>
        </BaseLayout>
      </>
    )
  )
}
