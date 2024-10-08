import { fetchComicIssue } from '@/app/lib/api/comicIssue/queries'
import { ComicIssueBottomSection } from '@/components/comicIssue/BottomSection'
import { ComicIssueBanner } from '@/components/comicIssue/Banner'
import { ComicIssueHeader } from '@/components/comicIssue/Header'
import { ComicIssueInfoSection } from '@/components/comicIssue/InfoSection'
import { ComicIssuePageParams } from '@/models/common'
import React from 'react'
import { CandyMachineStoreProvider } from '@/providers/CandyMachineStoreProvider'
import { BaseLayout } from '@/components/layout/BaseLayout'

export default async function ComicIssuePage({ params: { id } }: ComicIssuePageParams) {
  const comicIssue = await fetchComicIssue(id)
  if (!comicIssue || !comicIssue.stats || !comicIssue.myStats) return null

  return (
    <BaseLayout>
      <ComicIssueBanner cover={comicIssue.cover} />
      <ComicIssueHeader>
        <CandyMachineStoreProvider comicIssue={comicIssue} isAuthenticated={true}>
          <ComicIssueInfoSection comicIssue={comicIssue} />
        </CandyMachineStoreProvider>
        <ComicIssueBottomSection comicIssue={comicIssue} />
      </ComicIssueHeader>
      {comicIssue.isSecondarySaleActive && <p>secondary market</p>}
    </BaseLayout>
  )
}
