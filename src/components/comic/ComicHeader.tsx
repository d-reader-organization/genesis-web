import React from 'react'
import { Text } from '../ui/Text'
import { Comic } from '@/models/comic'
import { AvatarImage } from '../shared/AvatarImage'
import VerifiedIcon from 'public/assets/vector-icons/verified-icon.svg'
import { IconLink } from '../shared/IconLink'
import WebsiteIcon from 'public/assets/vector-icons/web-icon.svg'
import TwitterIcon from 'public/assets/vector-icons/twitter-icon.svg'
import DiscordIcon from 'public/assets/vector-icons/discord-icon.svg'
import TelegramIcon from 'public/assets/vector-icons/telegram-icon.svg'
import InstagramIcon from 'public/assets/vector-icons/instagram-icon.svg'
import TikTokIcon from 'public/assets/vector-icons/tiktok-icon.svg'
import YouTubeIcon from 'public/assets/vector-icons/youtube-icon.svg'
import { ComicStats } from './ComicStats'

type Props = {
  comic: Comic
}

export const ComicHeader: React.FC<Props> = ({ comic }) => (
  <div className='flex flex-col -mt-[100px] md:flex-row md:justify-between'>
    <LeftSection comic={comic} />
    <RightSection comic={comic} />
  </div>
)

const LeftSection: React.FC<Props> = ({ comic }) => {
  const { description, flavorText, genres, title } = comic
  return (
    <div className='flex flex-col gap-2 max-w-[680px]'>
      <Text className='font-normal' as='h1'>
        {title}
      </Text>
      {genres && (
        <div className='flex mt-8 mb-4 overflow-y-auto gap-10'>
          {genres.map((genre) => (
            <div className='flex items-center gap-2 whitespace-nowrap' key={genre.slug}>
              <img src={genre.icon} alt='' className='size-6 rounded-[4px]' />
              <Text className='text-lg' as='p'>
                {genre.name}
              </Text>
            </div>
          ))}
        </div>
      )}
      <FlavorText text={flavorText} />
      <Text className='text-lg' as='p'>
        {description}
      </Text>
      <ComicCreator comic={comic} />
    </div>
  )
}

const RightSection: React.FC<Props> = ({ comic }) => (
  <div className='flex flex-col gap-8 mt-4'>
    <div className='flex justify-start md:justify-end LINKSWRAPPER'>
      <Socials comic={comic} />
      <div className='w-max'></div>
    </div>
    <ComicStats comic={comic} />
  </div>
)

const FlavorText: React.FC<{ text: string }> = ({ text }) => (
  <Text className='border-l-4 border-l-important-color italic pl-2 mb-2 text-grey-100' as='p'>
    {text}
  </Text>
)

const ComicCreator: React.FC<Props> = ({ comic }) => {
  const { creator } = comic
  if (!creator) {
    return null
  }
  return (
    <div className='flex items-center gap-2 mt-1'>
      <AvatarImage size={48} src={creator.avatar} />
      <div className='ml-2 flex flex-col gap-1'>
        <Text className='text-grey-100 italic -mb-1 text-xs' as='p'>
          author
        </Text>
        <div className='flex items-center gap-2'>
          <Text className='font-bold text-lg' as='p'>
            {creator.name}
          </Text>
          {creator.isVerified && <VerifiedIcon className='size-[14px] ' />}
        </div>
      </div>
    </div>
  )
}

const Socials: React.FC<Props> = ({ comic }) => (
  <div className='flex gap-2 LINKS'>
    <IconLink className='bg-grey-300 rounded-lg' href={comic.website} Icon={WebsiteIcon} blank />
    <IconLink className='bg-grey-300 rounded-lg' href={comic.twitter} Icon={TwitterIcon} blank />
    <IconLink className='bg-grey-300 rounded-lg' href={comic.discord} Icon={DiscordIcon} blank />
    <IconLink className='bg-grey-300 rounded-lg' href={comic.telegram} Icon={TelegramIcon} blank />
    <IconLink className='bg-grey-300 rounded-lg' href={comic.instagram} Icon={InstagramIcon} blank />
    <IconLink className='bg-grey-300 rounded-lg' href={comic.tikTok} Icon={TikTokIcon} blank />
    <IconLink className='bg-grey-300 rounded-lg' href={comic.youTube} Icon={YouTubeIcon} blank />
  </div>
)
