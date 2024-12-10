import { fetchCreator } from '@/app/lib/api/creator/queries'
import { BaseLayout } from '@/components/layout/BaseLayout'
import React from 'react'
import { CreatorBanner } from '@/components/creator/Banner'
import { CreatorHeader } from '@/components/creator/Header'
import { Tabs } from '@/components/shared/Tabs'
import { getCreatorPageTabs } from '@/constants/tabs'
import { PreviewComicCard } from '@/components/comic/cards/PreviewCard'
import { fetchComics } from '@/app/lib/api/comic/queries'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    slug: string
  }
}

export default async function CreatorReleasesPage({ params: { slug } }: Props) {
  const creator = await fetchCreator(slug)
  const comics = await fetchComics({ creatorSlug: slug, skip: 0, take: 4 })
  const tabs = getCreatorPageTabs(slug)
  
  if (!creator) {
    console.log("nocreator")
    console.log(slug)
    console.log(creator)
    return null
    //notFound()
  }

  return (
    <BaseLayout>
      <div className='flex flex-col max-w-screen-xl w-full gap-4 sm:gap-7 md:gap-8'>
        <CreatorBanner creator={creator} />
        <CreatorHeader creator={creator} />
        <Tabs tabs={tabs} />
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8 md:gap-9'>
          {comics.map((comic) => (
            <PreviewComicCard key={comic.slug} comic={comic} />
          ))}
        </div>
      </div>
    </BaseLayout>
  )
}