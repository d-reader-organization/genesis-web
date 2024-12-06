import React from 'react'
import Image from 'next/image'
import { Creator } from '@/models/creator'
import { CREATOR_BANNER_SIZE } from '@/constants/imageSizes'
import { AvatarImage } from '../shared/AvatarImage'
import WebsiteIcon from 'public/assets/vector-icons/web-icon.svg'
import TwitterIcon from 'public/assets/vector-icons/twitter-icon.svg'
import InstagramIcon from 'public/assets/vector-icons/instagram-icon.svg'
import { IconLink } from '../shared/IconLink'

type Props = {
  creator: Creator
}

export const CreatorBanner: React.FC<Props> = ({ creator }) => {
  return (
    <div className='flex w-full relative'>
      <Image
        src={creator.banner}
        alt=''
        {...CREATOR_BANNER_SIZE}
        className='w-full rounded-2xl aspect-creator-banner object-top object-cover h-[300px]'
      />
      <AvatarImage src={creator.avatar} size='xlarge' className='absolute -bottom-6 left-4' />
      <div className='flex absolute bottom-3 right-3 border border-grey-300 text-white rounded-xl bg-grey-600 bg-opacity-10'>
        <IconLink className='rounded-lg' href={creator.website} Icon={WebsiteIcon} blank />
        <IconLink className='rounded-lg' href={creator.instagram} Icon={InstagramIcon} blank />
        <IconLink className='rounded-lg' href={creator.twitter} Icon={TwitterIcon} blank />
      </div>
    </div>
  )
}