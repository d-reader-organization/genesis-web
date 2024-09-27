import { fetchComicIssuePages, fetchPublicComicIssue } from '@/app/lib/api/comicIssue/queries'
import { isAuthenticatedUser } from '@/app/lib/auth'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { AboutIssueSection } from '@/components/mint/AboutIssueSection'
import { CouponsSection } from '@/components/mint/CouponsSection'
import { CoverSlider } from '@/components/mint/CoverSlider'
import { PagesPreview } from '@/components/mint/PagesPreview'
import { CandyMachineDetails, PurchaseRow } from '@/components/shared/CandyMachineDetails'
import { Divider } from '@/components/shared/Divider'
import { ComicIssuePageParams } from '@/models/common'

export default async function NewMintPage({ params }: ComicIssuePageParams) {
  const comicIssue = await fetchPublicComicIssue(params.id)
  if (!comicIssue) return null
  const pages = await fetchComicIssuePages(comicIssue.id)
  const isAuthenticated = isAuthenticatedUser()

  return (
    <BaseLayout>
      <div className='flex flex-col max-md:items-center md:flex-row md:justify-center gap-6 md:gap-10 w-full'>
        <CoverSlider covers={comicIssue.statelessCovers ?? []} />
        <div className='flex flex-col gap-6 w-full max-w-[800px]'>
          <div className='flex flex-col max-md:self-center gap-4'>
            <div className='flex gap-12 text-base md:text-lg font-medium leading-[22.4px] md:leading-[25.2px] text-grey-100'>
              <span>{comicIssue.comic?.title}</span>
              <span>EP {comicIssue.number}</span>
            </div>
            <h1 className='text-2xl md:text-[32px] leading-[24px] md:leading-[32px] font-semibold'>
              {comicIssue.title}
            </h1>
          </div>
          <CandyMachineDetails comicIssue={comicIssue} isAuthenticated={isAuthenticated} />
          <Divider className='max-md:hidden' />
          <CouponsSection candyMachineAddress={comicIssue.activeCandyMachineAddress ?? ''} />
          <Divider className='max-md:hidden' />
          <div className='flex flex-col 1160:flex-row gap-10 justify-between'>
            <AboutIssueSection comicIssue={comicIssue} />
            <PagesPreview comicIssueId={comicIssue.id} pages={pages} />
          </div>
        </div>
      </div>
      <PurchaseRow
        comicIssue={comicIssue}
        isAuthenticated={isAuthenticated}
        className='md:hidden max-h-[84px] p-4 flex items-center justify-center gap-4 w-full max-md:fixed max-md:bottom-0 max-md:z-50 max-md:bg-grey-600 max-md:backdrop-blur-[2px]'
      />
    </BaseLayout>
  )
}
