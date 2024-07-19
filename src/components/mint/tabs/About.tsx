import { CreatorInfoLink } from '@/components/creator/InfoLink'
import { AgeLabel } from '@/components/shared/AgeLabel'
import { GenresList } from '@/components/shared/GenresList'
import { TotalPagesText } from '@/components/shared/TotalPages'
import { ComicIssue } from '@/models/comicIssue'
import { Text } from '@/components/ui'
import React from 'react'

type Props = { comicIssue: ComicIssue }

export const AboutTab: React.FC<Props> = ({ comicIssue }) => (
  <div className='flex flex-col gap-6'>
    <GenresList genres={comicIssue.genres ?? []} />
    <Text className='text-lg font-medium' as='p'>
      {comicIssue.description.length > 281 ? comicIssue.description.substring(0, 281) + '...' : comicIssue.description}
    </Text>
    <div className='flex items-center justify-between'>
      <CreatorInfoLink className='mt-0' creator={comicIssue.creator} />
      <div className='flex items-center gap-4'>
        <TotalPagesText count={comicIssue.stats?.totalPagesCount ?? 0} />
        <AgeLabel age={12} />
      </div>
    </div>
  </div>
)
