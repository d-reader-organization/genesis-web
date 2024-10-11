import { ProjectFactsSection } from '@/components/invest/investslug/components/ProjectFactsSection'
import Header from '@/components/invest/investslug/components/Header'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { AuthorSection } from '@/components/invest/investslug/components/AuthorSection'
import { InvestSection } from '@/components/invest/investslug/components/InvestSection'
import { ProjectInvestData } from '@/components/invest/investslug/data/ProjectInvestData'
import { ProjectHeaderData } from '@/components/invest/investslug/data/ProjectHeaderData'
import { ProjectImage } from '@/components/invest/investslug/components/ProjectImage'
import { ProjectImageData } from '@/components/invest/investslug/data/ProjectImageData'
import { ProjectAuthorData } from '@/components/invest/investslug/data/ProjectAuthorData'
import { ProjectFactsData } from '@/components/invest/investslug/data/ProjectFAQData'

type Props = {
  params: { slug: string }
}

//mockProjectFetch function for filtering dummyData

export default async function InvestPage({ params }: Props) {
  return (
    <BaseLayout>
      <div className='flex flex-col max-w-screen-xl w-full'>
        {/*<Header title={PROJECTHEADER_DATA.title} subtitle={PROJECTHEADERDATA.subtitle className="max-md:hidden"} /> **/}
        <div className='flex flex-col md:flex-row w-full h-full gap-6 md:gap-10'>
          <div className='flex flex-col w-full'>
            <ProjectImage image={ProjectImageData.url} />
            <div className='md:hidden'>{/**    <InvestSection project={ProjectInvestData} />*/}</div>
            <div className='w-full'>
              <AuthorSection
                author={ProjectAuthorData.author}
                image={ProjectAuthorData.image}
                tags={ProjectAuthorData.tags}
              />
              <ProjectFactsSection facts={ProjectFactsData} />
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
