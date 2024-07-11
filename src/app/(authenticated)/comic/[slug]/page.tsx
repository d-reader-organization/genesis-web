import { fetchComic } from '@/app/lib/api/comic/queries'
import { ComicBanner } from '@/components/comic/ComicBanner'
import { ComicHeader } from '@/components/comic/ComicHeader'
import { Navigation } from '@/components/layout/Navigation'
import React from 'react'

type Props = {
  params: {
    slug: string
  }
}

async function ComicPage({ params: { slug } }: Props) {
  const comic = await fetchComic(slug)

  if (!comic || !comic.stats || !comic.myStats) {
    return null
  }
  return (
    <>
      <Navigation />
      <main className='mb-20 md:mb-10'>
        <ComicBanner banner={comic.banner} cover={comic.cover} logo={comic.logo} />
        <div className='container max-w-screen-xl'>
          <ComicHeader comic={comic} />
        </div>
      </main>
    </>
  )
}

export default ComicPage
