import { SignUpBanner } from '@/components/shared/SignUpBanner'
import { ComicIssuePageParams } from '@/models/common'
import React from 'react'

export default async function MintPage({ params }: ComicIssuePageParams) {
  return (
    <div className='mt-10 px-4 md:px-8 max-w-screen-xl mb-8'>
      <SignUpBanner comicIssueId={params.id} />
    </div>
  )
}
