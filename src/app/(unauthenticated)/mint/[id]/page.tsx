import { fetchPublicComicIssue } from '@/app/lib/api/comicIssue/queries'
import { isAuthenticatedUser } from '@/app/lib/auth'
import { Navigation } from '@/components/layout/Navigation'
import { MintComicInfo } from '@/components/mint/ComicInfo'
import { MintComicTitle } from '@/components/mint/ComicTitle'
import { MintTabs } from '@/components/mint/tabs'
import { BackgroundImageWithGradient } from '@/components/shared/BackgroundImageWithGradient'
import { SignUpBanner } from '@/components/shared/SignUpBanner'
import { ComicIssuePageParams } from '@/models/common'
import Image from 'next/image'
import React from 'react'

export default async function MintPage({ params }: ComicIssuePageParams) {
  const comicIssue = await fetchPublicComicIssue(params.id)
  if (!comicIssue) return null

  return (
    <>
      <Navigation paramId={params.id} />
      <BackgroundImageWithGradient image={comicIssue.cover}>
        <div className='px-4 md:px-8 max-w-screen-xl flex max-md:flex-col max-md:items-center justify-center items-start gap-8 max-md:mb-20'>
          <Image
            className='rounded-2xl shadow-issue-cover'
            src={comicIssue.cover}
            width={354}
            height={514}
            alt='issue-cover'
          />
          <div className='flex flex-col gap-4 w-full max-w-sm md:max-w-2xl'>
            <MintComicInfo comicIssue={comicIssue} />
            <MintComicTitle title={comicIssue.title} />
            <MintTabs comicIssue={comicIssue} isAuthenticated={isAuthenticatedUser()} />
            <SignUpBanner comicIssueId={params.id} />
          </div>
        </div>
      </BackgroundImageWithGradient>
    </>
  )
}
