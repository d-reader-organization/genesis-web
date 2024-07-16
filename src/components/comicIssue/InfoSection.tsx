import { Text } from '@/components/ui/Text'
import React from 'react'
import { FlavorText } from '../shared/FlavorText'
import { CreatorInfoLink } from '../shared/CreatorInfoLink'
import { InfoListActions } from '../shared/InfoListActions'
import { ComicIssueInfoProps } from '@/models/comicIssue'
import { GenresList } from '../shared/GenresList'
import { CandyMachineDetails } from '../shared/CandyMachineDetails'

export const ComicIssueInfoSection: React.FC<ComicIssueInfoProps> = ({ candyMachine, comicIssue }) => {
  const { description, flavorText, genres, title } = comicIssue
  return (
    <div className='flex flex-col gap-2 max-w-[680px]'>
      <Text className='font-normal' as='h1'>
        {title}
      </Text>
      <InfoListActions
        className='flex md:hidden w-fit my-4 [&>*]:min-w-20'
        averageRating={comicIssue.stats?.averageRating}
        favouritesCount={comicIssue.stats?.favouritesCount}
        isFavourite={comicIssue.myStats?.isFavourite}
        orientation='horizontal'
        rating={comicIssue.myStats?.rating}
      />
      {genres && <GenresList genres={genres} />}
      <FlavorText text={flavorText} />
      <Text className='text-lg' as='p'>
        {description}
      </Text>
      <CreatorInfoLink className='my-8' creator={comicIssue.creator} />
      {candyMachine && <CandyMachineDetails candyMachine={candyMachine} />}
    </div>
  )
}
