import { fetchComic } from '@/app/lib/api/comic/queries'
import { ComicBanner } from '@/components/comic/ComicBanner'
import { ComicHeader } from '@/components/comic/ComicHeader'
import { ComicIssueList } from '@/components/comicIssue/ComicIssueList'
import { Navigation } from '@/components/layout/Navigation'
import { SortOrder } from '@/enums/sortOrder'
import { ComicIssueSortTag } from '@/models/comicIssue/comicIssueParams'
import React from 'react'

type Props = {
  params: {
    slug: string
  }
}

export default async function ComicPage({ params: { slug } }: Props) {
  const comic = await fetchComic(slug)

  if (!comic || !comic.stats || !comic.myStats) {
    return null
  }
  return (
    <>
      <Navigation />
      <main className='mb-20 md:mb-10'>
        <ComicBanner banner={comic.banner} cover={comic.cover} logo={comic.logo} />
        <div className='px-4 md:px-8 max-w-screen-xl my-0 mx-auto'>
          <ComicHeader comic={comic} />
          <ComicIssueList
            enabled
            issuesCount={comic.stats.issuesCount}
            params={{ comicSlug: comic.slug, sortOrder: SortOrder.ASC, sortTag: ComicIssueSortTag.Latest }}
          />
        </div>
      </main>
    </>
  )
}
