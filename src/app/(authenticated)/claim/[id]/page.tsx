import { fetchComicIssuePreviewPages, fetchPublicComicIssue } from '@/app/lib/api/comicIssue/queries'
import { isAuthenticatedUser } from '@/app/lib/auth'
import { CandyMachineClaimDetails } from '@/components/claim/CandyMachineClaimDetails'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { AboutIssueSection } from '@/components/mint/AboutIssueSection'
import { CoverCarousel } from '@/components/mint/CoverCarousel'
import { PagesPreview } from '@/components/mint/PagesPreview'
import { ClaimPageHintDialog } from '@/components/shared/dialogs/ClaimPageHintDialog'
import { Divider } from '@/components/shared/Divider'
import { Text } from '@/components/ui'
import { MONSTER_CLAIM_QR_SLUG } from '@/constants/general'
import { ComicRarity } from '@/enums/comicRarity'
import { RoutePath } from '@/enums/routePath'
import { ComicIssuePageParams } from '@/models/common'
import { Metadata } from 'next'
import { redirect, RedirectType } from 'next/navigation'

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { rarity: ComicRarity }
}): Promise<Metadata> {
  const ogImagePath = searchParams.rarity
    ? `/api/og/${params.id}?rarity=${searchParams.rarity}`
    : `/api/og/${params.id}`

  return {
    openGraph: {
      images: ogImagePath,
    },
    twitter: {
      card: 'summary_large_image',
      images: ogImagePath,
    },
  }
}

export default async function ClaimPage({ params }: ComicIssuePageParams) {
  //hotfix: remove it after the monsters claim window expires
  if (params.id === MONSTER_CLAIM_QR_SLUG) {
    redirect(RoutePath.Claim(148), RedirectType.replace)
  }

  const comicIssue = await fetchPublicComicIssue(params.id)
  if (!comicIssue) return null
  const pages = await fetchComicIssuePreviewPages(comicIssue.id)
  const isAuthenticated = isAuthenticatedUser()

  return (
    <BaseLayout>
      <ClaimPageHintDialog />
      <div className='flex flex-col max-md:items-center md:flex-row md:justify-center gap-6 md:gap-10 w-full mb-2'>
        <CoverCarousel comicIssue={comicIssue} covers={comicIssue.statelessCovers ?? []} />
        <div className='flex flex-col gap-6 w-full max-w-[800px]'>
          <div className='flex flex-col max-md:self-center gap-4'>
            <div className='flex gap-12 text-base md:text-lg font-medium leading-[22.4px] md:leading-[25.2px] text-grey-100'>
              <span>{comicIssue.comic?.title}</span>
              <span>EP {comicIssue.number}</span>
            </div>
            <Text as='h3' styleVariant='primary-heading'>
              {comicIssue.title}
            </Text>
          </div>
          <CandyMachineClaimDetails comicIssue={comicIssue} isAuthenticated={isAuthenticated} />
          <Divider className='max-md:hidden' />
          <div className='flex flex-col 1160:flex-row gap-10 justify-between'>
            <AboutIssueSection comicIssue={comicIssue} />
            {pages.length ? <PagesPreview comicIssueId={comicIssue.id} pages={pages} /> : null}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}