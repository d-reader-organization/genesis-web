import Link from 'next/link'
import Image from 'next/image'
import { MoveLeft } from 'lucide-react'
import { IconLink } from '@/components/shared/IconLink'
import { backgroundText, text } from '@/constants/error'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { DISCORD_LINK, INSTAGRAM_LINK, TWITTER_LINK } from '@/constants/links'
import DiscordIcon from 'public/assets/vector-icons/discord-icon.svg'
import TwitterIcon from 'public/assets/vector-icons/twitter-icon.svg'
import InstagramIcon from 'public/assets/vector-icons/instagram-icon.svg'
import MailIconInverse from 'public/assets/vector-icons/mail-icon-inverse.svg'

export default function NotFound() {
  return (
    <BaseLayout>
      <div className='flex flex-col max-w-screen-xl w-full md:pt-[40px]'>
        <div className='flex flex-col h-[500px] relative justify-start items-center'>
          <BackgroundText text={backgroundText} />
          <div className='flex flex-col absolute w-[341px] h-[215.2px] bottom-[14px]'>
            <Image
              src='/assets/images/rabbit-hole.png'
              alt='dReader Page not found'
              fill
              style={{ objectFit: 'contain', objectPosition: 'center' }}
            />
          </div>
        </div>
        <div className='flex flex-col pt-[30px]'>
          <Message text={text} />
          <br />
        </div>
        <div className='flex flex-row w-full justify-center gap-2'>
          <IconLink
            className='w-auto bg-[#1f222a] rounded-xl gap-2 px-3'
            href='mailto:support@dreader.io'
            Icon={MailIconInverse}
            blank
          >
            <div className='flex items-center gap-2'>
              <MailIconInverse style={{ fill: '#c2c5ce' }} />
              <p className='text-[#c2c5ce] text-base font-normal leading-snug'>support@dreader.io</p>
            </div>
          </IconLink>
          <IconLink className='bg-[#1f222a] rounded-xl' href={TWITTER_LINK} Icon={TwitterIcon} blank />
          <IconLink className='bg-[#1f222a] rounded-xl' href={INSTAGRAM_LINK} Icon={InstagramIcon} blank />
          <IconLink className='bg-[#1f222a] rounded-xl' href={DISCORD_LINK} Icon={DiscordIcon} blank />
        </div>
        <div className='flex flex-col justify-center items-center'>
          <Link
            className='flex flex-row items-center justify-center w-[80.5px] pt-10 gap-2 border-b-2 border-[#c2c5ce]'
            href='https://www.dreader.app/'
          >
            <MoveLeft size={19} />
            <p className='text-[#c2c5ce] text-sm font-medium leading-snug'>Go back</p>
          </Link>
        </div>
      </div>
    </BaseLayout>
  )
}

type TextProps = {
  text: string
}

const BackgroundText: React.FC<TextProps> = ({ text }) => {
  return (
    <h2 className='text-center text-[#2f333e] text-8xl font-bold leading-[83px] tracking-tighter'>
      {text.split('\n').map((line, index) => (
        <span key={index}>
          {line}
          {index < text.split('\n').length - 1 && <br />}
        </span>
      ))}
    </h2>
  )
}

const Message: React.FC<TextProps> = ({ text }) => {
  return (
    <h2 className='text-center text-[#c2c5ce] text-sm font-medium leading-snug'>
      {text.split('\n').map((line, index) => (
        <span key={index}>
          {line}
          {index < text.split('\n').length - 1 && <br />}
        </span>
      ))}
    </h2>
  )
}
