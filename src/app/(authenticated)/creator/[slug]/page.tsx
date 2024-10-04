import { fetchCreator } from '@/app/lib/api/creator/queries'
import { BaseLayout } from '@/components/layout/BaseLayout'
import React from 'react'

type Props = {
  params: {
    slug: string
  }
}

export default async function CreatorPage({ params: { slug } }: Props) {
  const creator = await fetchCreator(slug)

  if (!creator) {
    return null
  }

  return (
    <BaseLayout>
      <span>Creator page</span>
    </BaseLayout>
  )
}
