import React from 'react'
import TwitterIcon from 'public/assets/vector-icons/twitter-icon.svg'
import InstagramIcon from 'public/assets/vector-icons/instagram-icon.svg'
import DiscordIcon from 'public/assets/vector-icons/discord-icon.svg'
import { IconLink } from './IconLink'
import { DISCORD_LINK, INSTAGRAM_LINK, TWITTER_LINK } from '@/constants/links'
import { DEFAULT_ICON_CLASSNAME } from '@/constants/defaultClassName'

export const ProductSocials: React.FC = () => (
  <div className='flex justify-between items-center text-grey-100'>
    <IconLink
      href={TWITTER_LINK}
      Icon={TwitterIcon}
      iconClassName={DEFAULT_ICON_CLASSNAME}
      blank
    />
    <IconLink
      href={INSTAGRAM_LINK}
      Icon={InstagramIcon}
      iconClassName={DEFAULT_ICON_CLASSNAME}
      blank
    />
    <IconLink
      href={DISCORD_LINK}
      Icon={DiscordIcon}
      iconClassName={DEFAULT_ICON_CLASSNAME}
      blank
    />
  </div>
)
