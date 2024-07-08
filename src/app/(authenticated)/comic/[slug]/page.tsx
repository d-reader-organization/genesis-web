import { Navigation } from '@/components/layout/Navigation'
import React from 'react'

type Props = {
  params: {
    slug: string
  }
}

async function ComicPage({ params: { slug } }: Props) {
  return (
    <>
      <Navigation />
      <div>Comic page with slug {slug}</div>
    </>
  )
}

export default ComicPage
