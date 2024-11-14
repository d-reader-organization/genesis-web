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
import { SUPPORT_LINK, DISCORD_LINK, INSTAGRAM_LINK, TWITTER_LINK, SUPPORT_EMAIL } from '@/constants/general'
import RabbitHole from 'public/assets/images/rabbit-hole.png'
import { RoutePath } from '@/enums/routePath'

export default function NotFound() {
  return (
    <BaseLayout>
      <div className='flex flex-col sm:w-[660px] justify-center items-center sm:pt-5 md:pt-10'>
        <Text
          as='h1'
          styleVariant='primary-heading'
          className='text-grey-400 uppercase text-center text-6xl leading-[52px] sm:text-9xl sm:leading-[111.36px] tracking-tight select-none'
        >
          YOU&apos;VE
          <br />
          FOUND THE
          <br />
          RABBIT
          <br />
          HOLE
        </Text>
        <Image
          src={RabbitHole.src}
          alt='dReader Page not found'
          className='w-[200px] sm:w-[360px] -mt-[46px] sm:-mt-[86px] h-auto pointer-events-none'
          width={400}
          height={254}
        />
        <Text
          as='p'
          styleVariant='body-normal'
          fontWeight='medium'
          className='text-grey-100 max-sm:text-xs text-center pt-4 mb-4 sm:pt-6'
        >
          You&apos;ve dug too deep and fell into a rabbit hole.
          <br />
          There is nothing significant inside but at least it&apos;s cozy.
        </Text>
        <div className='flex w-full justify-center gap-1 pt-1 sm:gap-2 text-grey-100'>
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
            iconClassName='w-[16px]'
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
