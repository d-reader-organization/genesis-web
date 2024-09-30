import { fetchComicIssue } from '@/app/lib/api/comicIssue/queries'
import { ComicIssueBottomSection } from '@/components/comicIssue/BottomSection'
import { ComicIssueBanner } from '@/components/comicIssue/Banner'
import { ComicIssueHeader } from '@/components/comicIssue/Header'
import { ComicIssueInfoSection } from '@/components/comicIssue/InfoSection'
import { Navigation } from '@/components/layout/Navigation'
import { ComicIssuePageParams } from '@/models/common'
import React from 'react'
import { CandyMachineStoreProvider } from '@/providers/CandyMachineStoreProvider'

export default async function ComicIssuePage({ params: { id } }: ComicIssuePageParams) {
  const comicIssue = await fetchComicIssue(id)
  if (!comicIssue || !comicIssue.stats || !comicIssue.myStats) return null

  return (
    <>
      <Navigation />
      <main className=''>
        <ComicIssueBanner cover={comicIssue.cover} />
        <div className='px-4 md:px-8 max-w-screen-xl mb-8'>
          <ComicIssueHeader>
            <CandyMachineStoreProvider comicIssue={comicIssue}>
              <ComicIssueInfoSection comicIssue={comicIssue} />
            </CandyMachineStoreProvider>
            <ComicIssueBottomSection comicIssue={comicIssue} />
          </ComicIssueHeader>
          {comicIssue.isSecondarySaleActive && <p>secondary market</p>}
        </div>
      </main>
    </>
  )
}
