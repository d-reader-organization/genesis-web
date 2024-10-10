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

export default async function InvestPage({ params }: Props) {
  return (
    <div className='flex flex-row w-full gap-6'>
      <div className='flex flex-col w-[72%] justify-between'>
        <ProjectImage image={ProjectImageData.url} />
        <div className='w-full min-w-[400px]'>
          <AuthorSection
            author={ProjectAuthorData.author}
            image={ProjectAuthorData.image}
            tags={ProjectAuthorData.tags}
          />
          <ProjectFactsSection faqs={ProjectFactsData} />
        </div>
      </div>
      <InvestSection project={ProjectInvestData} />
    </div>
  )
}