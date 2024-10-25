import React from 'react'
import { Text } from '../ui'
import Link from 'next/link'
import { Divider } from '../shared/Divider'
import DReaderSymbol from 'public/assets/vector-icons/logo-symbol.svg'
import { RoutePath } from '@/enums/routePath'
import {
  DISCORD_LINK,
  DPUBLISHER_LINK,
  GOOGLE_PLAY_APP_LINK,
  INSTAGRAM_LINK,
  LINKTREE_LINK,
  TENSOR_LINK,
  TWITTER_LINK,
} from '@/constants/links'
import GooglePlayIcon from 'public/assets/vector-icons/footer/google.svg'
import AppStoreIcon from 'public/assets/vector-icons/footer/app-store.svg'
import { SoonTag } from '../shared/Tags'

export const Footer: React.FC = () => (
  <div className='bg-black min-h-[220px] h-full flex justify-center items-center'>
    <div className='flex flex-col justify-end gap-6 md:gap-8 max-w-screen-xl w-full p-4'>
      <div className='flex max-md:flex-wrap max-md:gap-8 items-start justify-between w-full mt-8'>
        <FooterColumn
          links={[
            { isComingSoon: true, href: '/', name: 'Discover' },
            { isComingSoon: true, href: '/', name: 'Marketplace' },
            { isComingSoon: true, href: '/invest', name: 'Invest' },
            { isComingSoon: true, href: '/', name: 'Launchpad' },
          ]}
          title='Essentials'
        />
        <FooterColumn
          links={[
            { href: 'mailto:support@dreader.io', name: 'Help center' },
            { href: '/faq', name: 'FAQ' },
            { href: LINKTREE_LINK, name: 'Linktree' },
            { href: DPUBLISHER_LINK, name: 'Publish a comic' },
          ]}
          title='Links'
        />
        <FooterColumn
          links={[
            { href: TWITTER_LINK, name: '𝕏 / Twitter' },
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
        <Link href={RoutePath.PrivacyPolicy} target='_blank'>
          <Text as='span' className='text-grey-200 hover:text-white' styleVariant='body-normal'>
            Terms
          </Text>
        </Link>
        <Link href={RoutePath.PrivacyPolicy} target='_blank'>
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
  isComingSoon?: boolean
  href: string
  name: string
}

const FooterColumn: React.FC<ColumnProps> = ({ links, title }) => (
  <div className='flex flex-col gap-6'>
    <Text as='h4' styleVariant='body-small'>
      {title}
    </Text>
    <div className='flex flex-col gap-4'>
      {links.map((link, index) =>
        link.isComingSoon ? (
          <div key={`${link.name}-${index}`} className='flex items-end gap-1 relative'>
            <Text as='span' styleVariant='body-normal' className='text-grey-300'>
              {link.name}
            </Text>
            <SoonTag className='bg-grey-300' />
          </div>
        ) : (
          <Link
            className='text-base font-medium text-grey-100'
            href={link.href}
            key={`${link.name}-${index}`}
            target='_blank'
          >
            {link.name}
          </Link>
        )
      )}
    </div>
  </div>
)

const MobileAppsColumn: React.FC = () => (
  <div className='flex flex-col gap-8 max-w-80'>
    <Text as='h4' styleVariant='body-small'>
      Get the most of dReader with a mobile app!
    </Text>
    <div className='flex items-center gap-4'>
      <Link href={GOOGLE_PLAY_APP_LINK} target='_blank'>
        <GooglePlayIcon />
      </Link>
      <div className='flex flex-col items-center relative'>
        <SoonTag className='absolute z-10 -top-3.5 bg-grey-100' />
        <AppStoreIcon className='flex opacity-40 h-10' />
      </div>
    </div>
  </div>
)
