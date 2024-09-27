import { fetchComicIssuePages, fetchPublicComicIssue } from '@/app/lib/api/comicIssue/queries'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { AboutIssueSection } from '@/components/mint/AboutIssueSection'
import { CouponsSection } from '@/components/mint/CouponsSection'
import { CoverSlider } from '@/components/mint/CoverSlider'
import { PagesPreview } from '@/components/mint/PagesPreview'
import { CandyMachineDetails } from '@/components/shared/CandyMachineDetails'
import { Divider } from '@/components/shared/Divider'
import { ComicIssuePageParams } from '@/models/common'

export default async function NewMintPage({ params }: ComicIssuePageParams) {
  const comicIssue = await fetchPublicComicIssue(params.id)
  if (!comicIssue) return null
  const pages = await fetchComicIssuePages(comicIssue.id)

  return (
    <BaseLayout>
      <div className='flex gap-6'>
        <CoverSlider covers={comicIssue.statelessCovers ?? []} />
        <div className='flex flex-col gap-6'>
          {/* HEADER */}
          <div className='flex flex-col gap-4'>
            <div className='flex gap-12 text-lg font-medium leading-[25.2px] text-grey-100'>
              <span>{comicIssue.comic?.title}</span>
              <span>EP {comicIssue.number}</span>
            </div>
            <h1 className='text-[32px] leading-[32px] font-semibold'>{comicIssue.title}</h1>
          </div>
          <CandyMachineDetails comicIssue={comicIssue} isAuthenticated />
          <Divider />
          <CouponsSection candyMachineAddress={comicIssue.activeCandyMachineAddress ?? ''} />
          <Divider />
          <div className='flex gap-10 justify-between'>
            <AboutIssueSection comicIssue={comicIssue} />
            <PagesPreview comicIssueId={comicIssue.id} pages={pages} />
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
