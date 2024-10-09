import { FaqSection } from '@/components/invest/investslug/components/InvestComicFaq'
import Header from '@/components/invest/investslug/components/Header'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { AuthorSection } from '@/components/invest/investslug/components/AuthorSection'
import { InvestSection } from '@/components/invest/investslug/components/InvestSection'
import { ProjectInvestData } from '@/components/invest/investslug/data/ProjectInvestData'
import { ProjectHeaderData } from '@/components/invest/investslug/data/ProjectHeaderData'
import { ProjectImage } from '@/components/invest/investslug/components/ProjectImage'
import { ProjectImageData } from '@/components/invest/investslug/data/ProjectImageData'
import { ProjectAuthorData } from '@/components/invest/investslug/data/ProjectAuthorData'
import { ProjectFAQData } from '@/components/invest/investslug/data/ProjectFAQData'

type Props = {
  params: { slug: string }
}

export default async function InvestPage({ params }: Props) {
  return (
    <BaseLayout>
      <div className='flex flex-col justify-center items-center max-w-screen-xl w-full'>
        <Header title={ProjectHeaderData.title} subtitle={ProjectHeaderData.subtitle} />
        <div className='flex flex-row w-full h-full gap-6'>
          <div className='flex flex-col w-[72%] justify-between h-full'>
            <ProjectImage backgroundImageUrl={ProjectImageData.url} />
            <div className='w-full min-w-[400px]'>
              <AuthorSection author={ProjectAuthorData.author} imageURL={ProjectAuthorData.imageURL} tags={ProjectAuthorData.tags} />
              <FaqSection faqs={ProjectFAQData} />
            </div>
          </div>
          <InvestSection project={ProjectInvestData} />
        </div>
      </div>
    </BaseLayout>
  )
}
