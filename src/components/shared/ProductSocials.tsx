import React from 'react'
import TwitterIcon from 'public/assets/vector-icons/twitter-icon.svg'
import InstagramIcon from 'public/assets/vector-icons/instagram-icon.svg'
import DiscordIcon from 'public/assets/vector-icons/discord-icon.svg'

export const ProductSocials: React.FC = () => (
  <div className='flex justify-between items-center'>
    <TwitterIcon className='size-4' />
    <InstagramIcon className='size-4' />
    <DiscordIcon />
  </div>
)
