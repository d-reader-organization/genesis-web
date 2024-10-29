import React from 'react'
import TwitterIcon from 'public/assets/vector-icons/twitter-icon.svg'
import InstagramIcon from 'public/assets/vector-icons/instagram-icon.svg'
import DiscordIcon from 'public/assets/vector-icons/discord-icon.svg'
import Link from 'next/link'
import { DISCORD_LINK, INSTAGRAM_LINK, TWITTER_LINK } from '@/constants/general'

export const ProductSocials: React.FC = () => (
  <div className='flex justify-between items-center'>
    <Link href={TWITTER_LINK}>
      <TwitterIcon className='size-4' />
    </Link>
    <Link href={INSTAGRAM_LINK}>
      <InstagramIcon className='size-4' />
    </Link>
    <Link href={DISCORD_LINK}>
      <DiscordIcon />
    </Link>
  </div>
)
