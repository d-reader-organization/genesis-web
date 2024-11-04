import React from 'react'
import TwitterIcon from 'public/assets/vector-icons/twitter-icon.svg'
import InstagramIcon from 'public/assets/vector-icons/instagram-icon.svg'
import DiscordIcon from 'public/assets/vector-icons/discord-icon.svg'
import { DISCORD_LINK, INSTAGRAM_LINK, TWITTER_LINK } from '@/constants/general'
import { IconLink } from './IconLink'

export const ProductSocials: React.FC = () => (
  <div className='flex justify-between items-center text-grey-200'>
    <IconLink href={TWITTER_LINK} Icon={TwitterIcon} blank />
    <IconLink href={INSTAGRAM_LINK} Icon={InstagramIcon} blank />
    <IconLink href={DISCORD_LINK} Icon={DiscordIcon} blank />
  </div>
)
