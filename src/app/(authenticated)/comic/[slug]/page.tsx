import { fetchComic } from '@/app/lib/api/comic/queries'
import { ComicBanner } from '@/components/comic/Banner'
import { ComicHeader } from '@/components/comic/Header'
import { ComicIssueList } from '@/components/comicIssue/List'
import { BaseLayout } from '@/components/layout/BaseLayout'
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

  if (!comic || !comic.stats) {
    return null
  }
  return (
    <BaseLayout>
      <ComicBanner banner={comic.banner} cover={comic.cover} logo={comic.logo} />
      <div className='px-4 md:px-8 w-full max-w-screen-xl my-0 mx-auto'>
        <ComicHeader comic={comic} />
        <ComicIssueList
          enabled
          issuesCount={comic.stats.issuesCount}
          params={{ comicSlug: comic.slug, sortOrder: SortOrder.ASC, sortTag: ComicIssueSortTag.Latest }}
        />
      </div>
    </BaseLayout>
  )
}
