import { fetchCreator } from '@/app/lib/api/creator/queries'
import { BaseLayout } from '@/components/layout/BaseLayout'
import React from 'react'
import { CreatorBanner } from '@/components/creator/Banner'
import { CreatorHeader } from '@/components/creator/Header'
import { Tabs } from '@/components/shared/Tabs'
import { getCreatorPageTabs } from '@/constants/tabs'
import { NewCard } from '@/components/comic/cards/NewCard'
import { fetchComics } from '@/app/lib/api/comic/queries'

type Props = {
  params: {
    slug: string
  }
}

export default async function CreatorPage({ params: { slug } }: Props) {
  const creator = await fetchCreator(slug)
  const tabs = getCreatorPageTabs(slug)

  if (!creator) {
    return null
  }

  const comics = await fetchComics({ creatorSlug: slug, skip: 0, take: 3 })

  return (
    <BaseLayout>
      <div className='flex flex-col max-w-screen-xl w-full gap-9'>
        <CreatorBanner creator={creator} />
        <CreatorHeader creator={creator} />
        <Tabs tabs={tabs} />
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {comics.map((comic) => (
            <NewCard key={comic.slug} comic={comic} />
          ))}
        </div>
      </div>
    </BaseLayout>
  )
}
