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
import {
  SUPPORT_LINK,
  DISCORD_LINK,
  INSTAGRAM_LINK,
  TWITTER_LINK,
  SUPPORT_EMAIL,
} from '@/constants/general'
import BunBunUnderConstruction from 'public/assets/images/site-under-construction.png'
import { RoutePath } from '@/enums/routePath'

export default function UnderConstruction() {
  return (
    <BaseLayout>
      <div className='flex flex-col sm:w-[660px] justify-center items-center sm:pt-5 md:pt-10'>
        <Text
          as='h1'
          styleVariant='primary-heading'
          className='text-grey-400 uppercase text-center text-7xl leading-[62px] sm:text-9xl sm:leading-[111.36px] tracking-tight select-none'
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
          className='w-[214px] sm:w-[400px] mr-4 -mt-16 sm:-mt-[124px] sm:mr-8 h-auto pointer-events-none'
          width={400}
          height={430}
        />
        <Text
          as='p'
          styleVariant='body-normal'
          fontWeight='medium'
          className='text-grey-100 text-center px-1 pt-3 sm:px-14 max-sm:text-xs sm:pt-8 md:px-20 mb-4'
        >
          This page is currently under construction, and we can&apos;t wait to show you what we&apos;ve been working on.
          Please check back later!
          <br />
          <br />
          In the meantime, feel free to reach out to us:
        </Text>
        <div className='flex w-full justify-center gap-1 sm:gap-2 text-grey-100 pt-1'>
          <IconLink
            className='bg-grey-500 rounded-lg sm:rounded-xl gap-2'
            href={SUPPORT_LINK}
            Icon={MailIconInverse}
            blank
          >
            <MailIconInverse className='w-[16.67px]' />
            <Text as='p' styleVariant='body-normal' fontWeight='medium' className='max-sm:text-xs'>
              {SUPPORT_EMAIL}
            </Text>
          </IconLink>
          <IconLink
            className='bg-grey-500 rounded-lg sm:rounded-xl'
            href={TWITTER_LINK}
            Icon={TwitterIcon}
            iconClassName='w-4'
            blank
          />
          <IconLink
            className='bg-grey-500 rounded-lg sm:rounded-xl'
            href={INSTAGRAM_LINK}
            Icon={InstagramIcon}
            iconClassName='w-4'
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
          href={RoutePath.Home}
        >
          <MoveLeft size={16} />
          <Text as='p' styleVariant='body-normal' fontWeight='medium' className='max-sm:text-xs'>
            Go back
          </Text>
        </Link>
      </div>
    </BaseLayout>
  )
}
