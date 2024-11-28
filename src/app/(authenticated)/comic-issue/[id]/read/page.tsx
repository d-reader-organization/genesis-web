import { fetchAssets } from '@/app/lib/api/asset/queries'
import { fetchComicIssue, fetchComicIssuePages } from '@/app/lib/api/comicIssue/queries'
import { fetchMe } from '@/app/lib/api/user/queries'
import { ComicIssuePages } from '@/components/comicIssue/Pages'
import { EReaderNavigation } from '@/components/layout/EReaderNavigation'
import { UnwrapIssueDialog } from '@/components/shared/dialogs/UnwrapIssueDialog'
import { ComicIssuePageParams } from '@/models/common'
import PreviewPagesIcon from 'public/assets/vector-icons/preview-pages-icon.svg'
import React from 'react'

export default async function ReadComicIssuePage({ params }: ComicIssuePageParams) {
  const pages = await fetchComicIssuePages(params.id)
  const comicIssue = await fetchComicIssue(params.id)
  const me = await fetchMe()

  if (!pages || !comicIssue) return null

  const assets = await fetchAssets({
    comicIssueId: params.id,
    userId: me?.id,
  })

  const hasUnusedAssets = assets.some((asset) => !asset.isUsed)
  return (
    <>
      <EReaderNavigation comicIssue={comicIssue} />
      <main className='flex flex-col justify-center items-center max-w-screen-md mb-16 mx-auto'>
        {<ComicIssuePages pages={pages} />}
        {(!comicIssue.myStats?.canRead || !comicIssue.isFullyUploaded) && (
          <div className='rounded-2xl relative m-4 w-full border-2 border-grey-300 p-4 min-h-80'>
            <PreviewPagesIcon className='w-full h-auto brightness-50' />
            <div className='flex flex-col gap-2 absolute text-center p-4 top-1/2 left-1/2 w-full max-w-[380px] transform -translate-x-1/2 -translate-y-1/2'>
              <p className='text-lg sm:text-xl font-bold'>This is a comic preview!</p>
              {!comicIssue.myStats?.canRead && (
                <p className='text-sm sm:text-base md:text-xl'>
                  To view all pages you need to own at least one <strong>opened</strong> comic issue asset.
                </p>
              )}
              <UnwrapIssueDialog assets={assets} showUnwrapButton={hasUnusedAssets && !comicIssue.myStats?.canRead} />
              {!comicIssue.isFullyUploaded && (
                <p className='preview-message-text'>
                  This comic is not yet fully uploaded. New chapters/pages might be added weekly or the comic is still
                  in a presale phase.
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  )
}
