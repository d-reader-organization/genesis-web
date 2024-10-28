import React from 'react'
import { Text } from '../ui/Text'
import { Comic } from '@/models/comic'
import { IconLink } from '../shared/IconLink'
import WebsiteIcon from 'public/assets/vector-icons/web-icon.svg'
import TwitterIcon from 'public/assets/vector-icons/twitter-icon.svg'
import DiscordIcon from 'public/assets/vector-icons/discord-icon.svg'
import TelegramIcon from 'public/assets/vector-icons/telegram-icon.svg'
import InstagramIcon from 'public/assets/vector-icons/instagram-icon.svg'
import TikTokIcon from 'public/assets/vector-icons/tiktok-icon.svg'
import YouTubeIcon from 'public/assets/vector-icons/youtube-icon.svg'
import { ComicStats } from './Stats'
import { FlavorText } from '../shared/FlavorText'
import { CreatorInfoLink } from '../creator/InfoLink'
import { GenresList } from '../shared/GenresList'

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
    <div className='flex flex-col gap-2 w-full md:max-w-[680px]'>
      <Text className='font-normal' as='h2' styleVariant='primary-heading'>
        {title}
      </Text>
      {genres?.length ? <GenresList genres={genres} /> : null}
      <FlavorText text={flavorText} />
      <Text as='p' className='whitespace-pre-wrap mb-2' styleVariant='body-large'>
        {description}
      </Text>
      <CreatorInfoLink creator={comic.creator} />
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
