import { ProjectFactsSection } from '@/components/invest/investslug/components/ProjectFactsSection'
import Header from '@/components/invest/investslug/components/Header'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { CreatorSection } from '@/components/invest/investslug/components/CreatorSection'
import { InvestSection } from '@/components/invest/investslug/components/FundingSection'
import { ProjectBanner } from '@/components/invest/investslug/components/ProjectBanner'

type Props = {
  params: { slug: string }
}

//mockProjectFetch function for filtering dummyData

export default async function InvestPage({ params }: Props) {
  return (
    <BaseLayout>
      <div className='flex flex-col max-w-screen-xl w-full'>
        <Header title={} subtitle={ className="max-md:hidden"} />
        <div className='flex flex-col md:flex-row w-full h-full gap-6 md:gap-10'>
          <div className='flex flex-col w-full'>
            <ProjectBanner banner={} />
            <div className='md:hidden'>{/**    <InvestSection project={ProjectInvestData} />*/}</div>
            <div className='w-full'>
              <CreatorSection
                creator={}
                avatar={}
                tags={}
              />
              <ProjectFactsSection facts={} />
            </div>
            {/**
          </div>
          <div className='flex flex-col max-md:hidden'>
            <InvestSection project={ProjectInvestData} />*/}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
