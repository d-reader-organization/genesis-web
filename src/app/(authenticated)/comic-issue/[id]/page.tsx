import { fetchComicIssue, fetchComicIssuePreviewPages } from '@/app/lib/api/comicIssue/queries'
import { ComicIssueBanner } from '@/components/comicIssue/Banner'
import { ComicIssuePageParams } from '@/models/common'
import React from 'react'
import { CandyMachineStoreProvider } from '@/providers/CandyMachineStoreProvider'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { CoverCarousel } from '@/components/mint/CoverCarousel'
import { Text } from '@/components/ui'
import { CandyMachineDetails } from '@/components/shared/CandyMachineDetails'
import { Divider } from '@/components/shared/Divider'
import { AboutIssueSection } from '@/components/mint/AboutIssueSection'
import { PagesPreview } from '@/components/mint/PagesPreview'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import { ChevronRightIcon } from 'lucide-react'
import { InfoListActions } from '@/components/shared/InfoListActions'

export default async function ComicIssuePage({ params: { id } }: ComicIssuePageParams) {
  const comicIssue = await fetchComicIssue(id)
  if (!comicIssue || !comicIssue.stats || !comicIssue.myStats) return null
  const pages = await fetchComicIssuePreviewPages(comicIssue.id)

  return (
    <BaseLayout>
      <ComicIssueBanner cover={comicIssue.cover} />
      <div className='flex flex-col max-md:items-center md:flex-row md:justify-center gap-6 md:gap-10 w-full mb-2'>
        <div className='flex flex-col'>
          <CoverCarousel comicIssue={comicIssue} covers={comicIssue.statelessCovers ?? []} />
          <Link
            href={RoutePath.ReadComicIssue(comicIssue.id)}
            className='flex justify-center items-center gap-2 self-stretch text-[#AFB3BC] rounded-xl bg-grey-400 py-3 pr-2 pl-4 hover:brightness-125 max-h-[36px] md:max-h-[42px]'
          >
            <p className='text-xs md:text-base font-medium leading-normal md:leading-[22.4px]'>read episode</p>
            <ChevronRightIcon />
          </Link>
          <InfoListActions
            averageRating={comicIssue.stats?.averageRating}
            className='flex w-fit my-4 [&>*]:min-w-20'
            comicIssueId={comicIssue.id}
            favouritesCount={comicIssue.stats?.favouritesCount}
            isFavourite={comicIssue.myStats?.isFavourite}
            orientation='horizontal'
            rating={comicIssue.myStats?.rating}
          />
        </div>
        <div className='flex flex-col gap-6 w-full max-w-[800px] pb-20'>
          <div className='flex flex-col max-md:self-center gap-4'>
            <div className='flex gap-12 text-base md:text-lg font-medium leading-[22.4px] md:leading-[25.2px] text-grey-100'>
              <span>{comicIssue.comic?.title}</span>
              <span>EP {comicIssue.number}</span>
            </div>
            <Text as='h3' styleVariant='primary'>
              {comicIssue.title}
            </Text>
          </div>
          <div className='flex flex-col 1160:flex-row gap-10 justify-between'>
            <AboutIssueSection comicIssue={comicIssue} />
            {pages.length ? <PagesPreview comicIssueId={comicIssue.id} pages={pages} /> : null}
          </div>
          <Divider className='max-md:hidden' />
          <CandyMachineStoreProvider comicIssue={comicIssue} isAuthenticated>
            <CandyMachineDetails comicIssue={comicIssue} isAuthenticated />
          </CandyMachineStoreProvider>
        </div>
      </div>
    </BaseLayout>
  )
}
