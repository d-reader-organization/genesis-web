import { Navigation } from '@/components/layout/Navigation'
import React from 'react'

type Props = {
  params: {
    id: string
  }
}

async function ComicIssuePage({ params: { id } }: Props) {
  return (
    <>
      <Navigation />
      <div>Comic issue with {id}</div>
    </>
  )
}

export default ComicIssuePage
