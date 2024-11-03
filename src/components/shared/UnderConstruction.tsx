import Link from 'next/link'
import Image from 'next/image'
import { Text } from '@/components/ui'
import { MoveLeft } from 'lucide-react'
import { IconLink } from '@/components/shared/IconLink'
import { BaseLayout } from '@/components/layout/BaseLayout'
import DiscordIcon from 'public/assets/vector-icons/discord-icon.svg'
import TwitterIcon from 'public/assets/vector-icons/twitter-icon.svg'
import InstagramIcon from 'public/assets/vector-icons/instagram-icon.svg'
import MailIconInverse from 'public/assets/vector-icons/mail-icon-inverse.svg'
import { SUPPORT_LINK, DISCORD_LINK, INSTAGRAM_LINK, TWITTER_LINK } from '@/constants/general'
import BunBunUnderConstruction from 'public/assets/images/under-construction.png'

export default function UnderConstruction() {
  return (
    <BaseLayout>
      <div className='flex flex-col sm:w-[660px] justify-center items-center sm:pt-5 md:pt-10'>
        <Text
          as='h1'
          styleVariant='primary-heading'
          className='text-grey-400 uppercase text-center text-7xl leading-[62px] sm:text-9xl sm:leading-[111.36px] tracking-tight'
        >
          WE&apos;RE
          <br />
          BUILDING
          <br />
          SOMETHING
          <br />
          GREAT!
        </Text>
        <Image
          src={BunBunUnderConstruction.src}
          alt='dReader Page not found'
          className='w-[214px] sm:w-[400px] mr-4 -mt-16 sm:-mt-[124px] sm:mr-8 h-auto'
          width={400}
          height={430}
        />
       <Text
          as='p'
          styleVariant='body-normal'
          fontWeight='medium'
          className='text-grey-100 text-center px-1 pt-3 sm:px-14 max-sm:text-xs sm:pt-8 md:px-20'
        >
          This page is currently under construction, and we can&apos;t wait to show you what we&apos;ve been working on.
          <br />
          Please check back later!
          <br /> <br />
          In the meantime, feel free to reach out to us:
          <br /> <br />
        </Text>
        <div className='flex w-full justify-center gap-1 sm:gap-2 text-grey-100 pt-1'>
          <IconLink
            className='bg-grey-500 rounded-lg sm:rounded-xl gap-2'
            href={'mailto:' + SUPPORT_LINK}
            Icon={MailIconInverse}
            blank
          >
            <MailIconInverse className='w-[16.67px]' />
            <Text as='p' styleVariant='body-normal' fontWeight='medium' className='max-sm:text-xs'>
              {SUPPORT_LINK}
            </Text>
          </IconLink>
          <IconLink
            className='bg-grey-500 rounded-lg sm:rounded-xl'
            href={TWITTER_LINK}
            Icon={TwitterIcon}
            iconClassName='w-[13.09px]'
            blank
          />
          <IconLink
            className='bg-grey-500 rounded-lg sm:rounded-xl'
            href={INSTAGRAM_LINK}
            Icon={InstagramIcon}
            iconClassName='w-[14px]'
            blank
          />
          <IconLink
            className='bg-grey-500 rounded-lg sm:rounded-xl'
            href={DISCORD_LINK}
            Icon={DiscordIcon}
            iconClassName='w-4'
            blank
          />
        </div>
        <Link
          className='flex items-center gap-1 pt-7 sm:pt-9 sm:gap-2 border-b-2 text-grey-100 border-grey-100'
          href='https://www.dreader.app/'
        >
          <MoveLeft size={19} className='max-sm:hidden' />
          <MoveLeft size={16} className='sm:hidden' />
          <Text
            as='p'
            styleVariant='body-normal'
            fontWeight='medium'
            className='max-sm:text-xs'
          >
            Go back
          </Text>
        </Link>
      </div>
    </BaseLayout>
  )
}
