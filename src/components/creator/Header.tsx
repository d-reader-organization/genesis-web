import React from 'react'
import { Text } from '../ui/Text'
import { Creator } from '@/models/creator'
import { FollowCreatorButton } from '../shared/buttons/FollowCreatorButton'
import { formatCurrency } from '@/utils/numbers'
import { ShareButton } from '../shared/buttons/ShareButton'

type Props = {
  creator: Creator
}

export const CreatorHeader: React.FC<Props> = ({ creator }) => (
  <div className='flex flex-col w-full mt-5 gap-6 sm:gap-8 max-sm:items-center sm:flex-row sm:justify-between sm:mt-4'>
    <LeftSection creator={creator} />
    <RightSection creator={creator} />
  </div>
)

const LeftSection: React.FC<Props> = ({ creator }) => {
  return (
    <div className='flex flex-col gap-2 w-full text-center items-center sm:max-w-[500px] sm:items-start sm:text-start'>
      <Text as='h3' styleVariant='primary-heading' fontWeight='semibold'>
        {creator.name}
      </Text>
      <Text as='p' className='whitespace-pre-wrap mb-2 text-grey-100' styleVariant='body-normal'>
        {creator.description}
      </Text>
      <div className='flex gap-2 items-center'>
        <FollowCreatorButton
          isFollowing={creator.myStats.isFollowing}
          creatorSlug={creator.slug}
          className='max-h-10 sm:max-h-10 rounded-lg'
        />
        <ShareButton title={creator.name} text={creator.description} />
      </div>
    </div>
  )
}

const RightSection: React.FC<Props> = ({ creator }) => (
  <div className='flex flex-col gap-4 p-4 border rounded-xl border-grey-300 w-full h-auto max-h-[152px] sm:max-w-[282px] sm:p-6'>
    <div className='flex justify-between'>
      <Text as='span' styleVariant='body-small' className='text-grey-100 uppercase max-sm:text-xs'>
        VOLUME
      </Text>
      <Text as='span' styleVariant='body-small' fontWeight='bold' className='uppercase max-sm:text-xs'>
        {formatCurrency({ value: creator.stats.totalVolume, currency: '$', divisor: 1, fractionDigits: 0 })}
      </Text>
    </div>
    <div className='w-full h-[1px] bg-grey-300' />
    <div className='flex justify-between'>
      <Text as='span' styleVariant='body-small' className='text-grey-100 uppercase max-sm:text-xs'>
        EPISODES
      </Text>
      <Text as='span' styleVariant='body-small' fontWeight='bold' className='uppercase max-sm:text-xs'>
        {creator.stats.comicIssuesCount}
      </Text>
    </div>
    {/* <div className='flex justify-between'>
      <Text as='span' styleVariant='body-small' className='text-grey-100 uppercase max-sm:text-xs'>
        COLLECTIBLES
      </Text>
      <Text as='span' styleVariant='body-small' fontWeight='bold' className='uppercase max-sm:text-xs'>
        {creator.stats.comicIssuesCount}
      </Text>
    </div> */}
    <div className='flex justify-between'>
      <Text as='span' styleVariant='body-small' className='text-grey-100 uppercase max-sm:text-xs'>
        FOLLOWERS
      </Text>
      <Text as='span' styleVariant='body-small' fontWeight='bold' className='uppercase max-sm:text-xs'>
        {creator.stats.followersCount}
      </Text>
    </div>
  </div>
)
