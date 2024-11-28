import { ComicIssue } from '@/models/comicIssue'
import { GenreTags } from '../shared/GenresList'
import { ExpandableText } from '../shared/ExpandableText'
import { AudienceWidget } from '../shared/AudienceWidget'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { Divider } from '../shared/Divider'
import { CreatorInfoLink } from '../creator/InfoLink'
import React from 'react'
import { AudienceType } from '@/enums/audienceType'
import { RoutePath } from '@/enums/routePath'

type Props = {
  comicIssue: ComicIssue
}

export const AboutIssueSection: React.FC<Props> = ({ comicIssue }) => (
  <div className='flex flex-col gap-6'>
    <h5 className='text-xl font-semibold leading-[20px] tracking-[0.04px]'>Description</h5>
    <GenreTags genres={comicIssue.genres ?? []} />
    <ExpandableText className='max-w-[440px] lg:max-w-[486px]' text={comicIssue.description} />
    <div className='flex justify-between'>
      <div className='flex gap-4 items-center'>
        <div className='text-base font-medium leading-[22.4px]'>
          <span>{comicIssue.stats?.totalPagesCount}&nbsp;</span>
          <span className='text-grey-100'>pages</span>
        </div>
        <AudienceWidget audience={comicIssue.comic?.audienceType ?? AudienceType.Everyone} />
      </div>
      <Link
        className='max-h-9 px-3 py-2 flex gap-2 justify-center items-center rounded-lg bg-grey-500'
        href={RoutePath.Comic(comicIssue.comicSlug)}
        target='_blank'
      >
        <ExternalLink className='text-grey-100' size={20} />
        <span className='text-base font-medium leading-[22.4px] text-grey-100'>Explore series</span>
      </Link>
    </div>
    <Divider />
    <CreatorInfoLink creator={comicIssue.creator} />
  </div>
)
