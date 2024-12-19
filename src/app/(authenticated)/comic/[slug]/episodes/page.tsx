import { fetchComic } from '@/app/lib/api/comic/queries'
import { fetchComicIssues } from '@/app/lib/api/comicIssue/queries'
import { ComicBanner } from '@/components/comic/Banner'
import { ComicHeader } from '@/components/comic/Header'
import { DefaultComicIssueCard } from '@/components/comicIssue/cards/DefaultCard'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { Tabs } from '@/components/shared/Tabs'
import { getComicPageTabs } from '@/constants/tabs'
import React from 'react'

type Props = {
  params: {
    slug: string
  }
}

export default async function ComicEpisodesPage({ params: { slug } }: Props) {
  const comic = await fetchComic(slug)
  const tabs = getComicPageTabs(slug)
  const comicIssues = await fetchComicIssues({ comicSlug: slug, skip: 0, take: 6 })

  if (!comic || !comic.stats) {
    return null
  }

  return (
    <BaseLayout>
      <ComicBanner banner={comic.banner} cover={comic.cover} logo={comic.logo} />
      <div className='flex flex-col px-4 md:px-8 w-full max-w-screen-xl -mt-[150px] gap-8'>
        <ComicHeader comic={comic} />
        <Tabs tabs={tabs} />
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 xl:grid-cols-6 gap-4 sm:gap-7 md:gap-8'>
          {comicIssues.map((comicIssue) => (
            <DefaultComicIssueCard key={comicIssue.slug} comicIssue={comicIssue} />
          ))}
        </div>
      </div>
    </BaseLayout>
  )
}
