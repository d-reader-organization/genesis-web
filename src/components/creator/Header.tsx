import React from 'react'
import { Text } from '../ui/Text'
import { Creator } from '@/models/creator'
import ShareIcon from 'public/assets/vector-icons/share.svg'

type Props = {
  creator: Creator
}

export const CreatorHeader: React.FC<Props> = ({ creator }) => (
  <div className='flex flex-col w-full md:flex-row md:justify-between'>
    <LeftSection creator={creator} />
    <RightSection creator={creator} />
  </div>
)

const LeftSection: React.FC<Props> = ({ creator }) => {
  return (
    <div className='flex flex-col gap-2 w-full md:max-w-[500px]'>
      <Text as='h3' styleVariant='primary-heading' fontWeight='semibold'>
        {creator.name}
      </Text>
      <Text as='p' className='whitespace-pre-wrap mb-2' styleVariant='body-normal'>
        {creator.description}
      </Text>
      <div className='flex gap-2'>
        bijelo follow dugme
        <button className='flex bg-grey-300 bg-opacity-30 items-center rounded-lg gap-2 p-2 text-grey-100'>
          <ShareIcon className='w-4 max-md:hidden' />
          <ShareIcon className='w-4 md:hidden' />
        </button>
      </div>
    </div>
  )
}

const RightSection: React.FC<Props> = ({ creator }) => (
  <div className='flex flex-col gap-4 p-6 border rounded-xl border-grey-300 w-[282px]'>
    <div className='flex justify-between'>
      <Text as='span' styleVariant='body-small' className='text-grey-100 uppercase'>
        VOLUME
      </Text>
      <Text as='span' styleVariant='body-small' fontWeight='bold' className='uppercase'>
        {creator.stats.totalVolume}
      </Text>
    </div>
    <div className='w-full h-[1px] bg-grey-300' />
    <div className='flex justify-between'>
      <Text as='span' styleVariant='body-small' className='text-grey-100 uppercase'>
        EPISODES
      </Text>
      <Text as='span' styleVariant='body-small' fontWeight='bold' className='uppercase'>
        {creator.stats.comicIssuesCount}
      </Text>
    </div>
    {/* <div className='flex justify-between'>
      <Text as='span' styleVariant='body-small' className='text-grey-100 uppercase'>
        COLLECTIBLES
      </Text>
      <Text as='span' styleVariant='body-small' fontWeight='bold' className='uppercase'>
        {creator.stats.comicIssuesCount}
      </Text>
    </div> */}
    <div className='flex justify-between'>
      <Text as='span' styleVariant='body-small' className='text-grey-100 uppercase'>
        FOLLOWERS
      </Text>
      <Text as='span' styleVariant='body-small' fontWeight='bold' className='uppercase'>
        {creator.stats.followersCount}
      </Text>
    </div>
  </div>
)
