import React from 'react'
import { Text } from '../ui'
import Link from 'next/link'
import { Divider } from '../shared/Divider'
import DReaderSymbol from 'public/assets/vector-icons/logo-symbol.svg'
import { RoutePath } from '@/enums/routePath'
import { DISCORD_LINK, GOOGLE_PLAY_APP_LINK, INSTAGRAM_LINK, TENSOR_LINK, TWITTER_LINK } from '@/constants/links'
import GooglePlayIcon from 'public/assets/vector-icons/footer/google.svg'
import AppStoreIcon from 'public/assets/vector-icons/footer/app-store.svg'

export const Footer: React.FC = () => (
  <div className='bg-black min-h-[220px] h-full flex justify-center items-center'>
    <div className='flex flex-col justify-end gap-6 md:gap-8 max-w-screen-xl w-full p-4'>
      <div className='flex max-md:flex-wrap max-md:gap-8 items-start justify-between w-full mt-8'>
        <FooterColumn
          links={[
            { href: '/', name: 'Discover' },
            { href: '/', name: 'Marketplace' },
            { href: '/invest', name: 'Invest' },
            { href: '/', name: 'Launchpad' },
          ]}
          title='Essentials'
        />
        <FooterColumn
          links={[
            { href: '/', name: 'Help center' },
            { href: '/faq', name: 'FAQ' },
            { href: '/', name: 'Brand assets' },
          ]}
          title='Links'
        />
        <FooterColumn
          links={[
            { href: TWITTER_LINK, name: 'X' },
            { href: DISCORD_LINK, name: 'Discord' },
            { href: INSTAGRAM_LINK, name: 'Instagram' },
            { href: TENSOR_LINK, name: 'Trade on Tensor' },
          ]}
          title='Rabbithole'
        />
        <MobileAppsColumn />
      </div>
      <Divider className='md:mt-8 bg-grey-400' />
      <div className='flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 md:gap-16'>
        <DReaderSymbol className='text-grey-200' />
        <Text as='span' className='text-grey-200' styleVariant='body-normal'>
          &#169; Decentralized Reader, ltd
        </Text>
        <Link href={RoutePath.PrivacyPolicy}>
          <Text as='span' className='text-grey-200 hover:text-white' styleVariant='body-normal'>
            Terms
          </Text>
        </Link>
        <Link href={RoutePath.PrivacyPolicy}>
          <Text as='span' className='text-grey-200 hover:text-white' styleVariant='body-normal'>
            Privacy Policy
          </Text>
        </Link>
      </div>
    </div>
  </div>
)

type ColumnProps = {
  links: FooterLink[]
  title: string
}

type FooterLink = {
  href: string
  name: string
}

const FooterColumn: React.FC<ColumnProps> = ({ links, title }) => (
  <div className='flex flex-col gap-6'>
    <Text as='h4' styleVariant='secondary'>
      {title}
    </Text>
    <div className='flex flex-col gap-4'>
      {links.map((link, index) => (
        <Link className='text-base font-medium text-grey-100' href={link.href} key={`${link.name}-${index}`}>
          {link.name}
        </Link>
      ))}
    </div>
  </div>
)

const MobileAppsColumn: React.FC = () => (
  <div className='flex flex-col gap-8 max-w-80'>
    <Text as='h4' styleVariant='secondary'>
      Get the most of dReader with a mobile app!
    </Text>
    <div className='flex items-center gap-4'>
      <Link href={GOOGLE_PLAY_APP_LINK}>
        <GooglePlayIcon />
      </Link>
      <div className='flex flex-col items-center relative'>
        <div className='h-5 flex justify-center items-center rounded-lg bg-grey-100 w-fit px-4 absolute z-10 -top-3.5'>
          <span className='text-xxs font-bold text-grey-600'>SOON</span>
        </div>
        <AppStoreIcon className='flex opacity-40 h-10' />
      </div>
    </div>
  </div>
)
