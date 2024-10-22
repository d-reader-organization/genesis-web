import { fetchComicsByOwner, fetchFavoriteComics } from '@/app/lib/api/comic/queries'
import { fetchMe } from '@/app/lib/api/user/queries'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { LibraryTabs } from '@/components/library/Tabs'
import { SortOrder } from '@/enums/sortOrder'
import { ComicSortTag } from '@/models/comic/comicParams'
import React from 'react'

export default async function LibraryPage() {
  const me = await fetchMe()
  if (!me) {
    return null
  }
  const [favoriteComics, ownedComics] = await Promise.all([
    fetchFavoriteComics({
      params: { skip: 0, take: 20, sortTag: ComicSortTag.Title, sortOrder: SortOrder.DESC },
      userId: me.id,
    }),
    fetchComicsByOwner({
      params: { skip: 0, take: 20, sortTag: ComicSortTag.Title, sortOrder: SortOrder.DESC },
      userId: me.id,
    }),
  ])

  return (
    <BaseLayout showFooter>
      <LibraryTabs comics={favoriteComics} />
    </BaseLayout>
  )
}
