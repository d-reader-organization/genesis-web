import { ComicIssue } from '@/models/comicIssue'
import React from 'react'
import Image from 'next/image'
import { ButtonLink } from '../ui/Button'
import { RoutePath } from '@/enums/routePath'

type Props = {
  comicIssue: ComicIssue
}

export const ComicIssueBottomSection: React.FC<Props> = ({ comicIssue }) => (
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
      className='text-grey-100 py-2 px-4 min-w-[92px] mb-4'
      backgroundColor='transparent'
      borderColor='grey-100'
      href={RoutePath.ReadComicIssue(comicIssue.id)}
    >
      Read
    </ButtonLink>
  </div>
)
