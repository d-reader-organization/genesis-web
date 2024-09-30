import { fetchComicIssuePreviewPages, fetchPublicComicIssue } from '@/app/lib/api/comicIssue/queries'
import { isAuthenticatedUser } from '@/app/lib/auth'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { AboutIssueSection } from '@/components/mint/AboutIssueSection'
import { CoverCarousel } from '@/components/mint/CoverCarousel'
import { PagesPreview } from '@/components/mint/PagesPreview'
import { CandyMachineDetails } from '@/components/shared/CandyMachineDetails'
import { Divider } from '@/components/shared/Divider'
import { ComicIssuePageParams } from '@/models/common'
import { CandyMachineProvider } from '@/providers/CandyMachineProvider'

export default async function NewMintPage({ params }: ComicIssuePageParams) {
  const comicIssue = await fetchPublicComicIssue(params.id)
  if (!comicIssue) return null
  const pages = await fetchComicIssuePreviewPages(comicIssue.id)
  const isAuthenticated = isAuthenticatedUser()

  return (
    <BaseLayout>
      <div className='flex flex-col max-md:items-center md:flex-row md:justify-center gap-6 md:gap-10 w-full mb-2'>
        <CoverCarousel comicIssue={comicIssue} covers={comicIssue.statelessCovers ?? []} />
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
          <CandyMachineProvider comicIssue={comicIssue}>
            <CandyMachineDetails comicIssue={comicIssue} isAuthenticated={isAuthenticated} />
          </CandyMachineProvider>
          <Divider className='max-md:hidden' />
          <div className='flex flex-col 1160:flex-row gap-10 justify-between'>
            <AboutIssueSection comicIssue={comicIssue} />
            {pages.length && <PagesPreview comicIssueId={comicIssue.id} pages={pages} />}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
