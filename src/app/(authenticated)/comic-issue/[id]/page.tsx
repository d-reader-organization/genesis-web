import { fetchComicIssue } from '@/app/lib/api/comicIssue/queries'
import { ComicIssueBottomSection } from '@/components/comicIssue/BottomSection'
import { ComicIssueBanner } from '@/components/comicIssue/ComicIssueBanner'
import { ComicIssueHeader } from '@/components/comicIssue/ComicIssueHeader'
import { ComicIssueInfoSection } from '@/components/comicIssue/InfoSection'
import { Navigation } from '@/components/layout/Navigation'
import React from 'react'

export type ComicIssuePageParams = {
  params: {
    id: string
  }
}

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
            <ComicIssueInfoSection comicIssue={comicIssue} />
            <ComicIssueBottomSection comicIssue={comicIssue} />
          </ComicIssueHeader>
          {comicIssue.isSecondarySaleActive && <p>secondary market</p>}
        </div>
      </main>
    </>
  )
}
