import { ComicIssue } from '@/models/comicIssue'
import React from 'react'
import Image from 'next/image'
import { ButtonLink } from '../ui/Button'
import { RoutePath } from '@/enums/routePath'
import { InfoListActions } from '../shared/InfoListActions'

type Props = {
  comicIssue: ComicIssue
}

export const ComicIssueBottomSection: React.FC<Props> = ({ comicIssue }) => (
  <div className='block md:flex gap-6'>
    <InfoListActions
      className='hidden md:flex w-fit my-4 [&>*]:min-w-20'
      averageRating={comicIssue.stats?.averageRating}
      favouritesCount={comicIssue.stats?.favouritesCount}
      isFavourite={comicIssue.myStats?.isFavourite}
      orientation='vertical'
      rating={comicIssue.myStats?.rating}
    />
    <div className='flex flex-col gap-4'>
      <Image
        className='aspect-comic-issue-cover-aspect-ratio w-full max-h-[480px] rounded-lg h-auto hidden md:block'
        src={comicIssue.cover}
        alt=''
        priority
        width={600}
        height={800}
      />
      <ButtonLink
        className='text-grey-100 py-2 px-4 min-w-[92px] max-w-[680px] mb-4'
        backgroundColor='transparent'
        borderColor='grey-100'
        href={RoutePath.ReadComicIssue(comicIssue.id)}
      >
        Read
      </ButtonLink>
    </div>
    
  </div>
)
