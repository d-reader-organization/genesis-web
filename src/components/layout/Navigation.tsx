'use client'

import React from 'react'
import { RoutePath } from '@/enums/routePath'
import { usePathname } from 'next/navigation'
import { useIsMobile } from '@/hooks/useBreakpoints'
import { BottomNavItem, BottomNavigation } from './BottomNavigation'
import FullLogo from 'public/assets/vector-icons/full-logo.svg'
import SearchIcon from 'public/assets/vector-icons/search-icon.svg'
import DiscoverIcon from 'public/assets/vector-icons/discover-icon.svg'
import LibraryIcon from 'public/assets/vector-icons/library-icon.svg'
import ProfileIcon from 'public/assets/vector-icons/profile.svg'
import { Button, Input } from '../ui'
import Link from 'next/link'
import clsx from 'clsx'
import { WALLET_LABELS } from '@/constants/wallets'
import dynamic from 'next/dynamic'

const BaseWalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).BaseWalletMultiButton,
  { ssr: false }
)

type Props = {
  paramId?: string | number
}

export const Navigation: React.FC<Props> = ({ paramId }) => {
  const pathname = usePathname()

  const isHome = pathname === RoutePath.Home
  const isDiscover = pathname.startsWith(RoutePath.Discover)
  const isLibrary = pathname.startsWith(RoutePath.Library)
  const isProfile = pathname.startsWith(RoutePath.Profile)

  const isMobile = useIsMobile()
  const isMint = paramId ? pathname === RoutePath.Mint(paramId) || RoutePath.ComicIssue(paramId) : false

  return isMobile ? (
    <BottomNavigation
      initialNavItem={isDiscover ? BottomNavItem.discover : isProfile ? BottomNavItem.profile : BottomNavItem.home}
    />
  ) : (
    <div
      className={clsx(
        'w-full min-h-16 z-10 bg-grey-600/75 backdrop-blur-[10px]',
        (isHome || isDiscover) && 'fixed  left-0 right-0'
      )}
    >
      <div className='gap-4 flex justify-between items-center my-0 mx-auto max-w-[1536px] px-8 pt-8 pb-6 w-full'>
        <Link href={RoutePath.Home}>
          <FullLogo className='h-8 min-w-fit' />
        </Link>
        <Input
          className='w-[50%]'
          placeholder='Search comics, episodes, genres, and creators'
          prefixIcon={<SearchIcon />}
        />
        <div className='flex gap-4 md:gap-6'>
          <MenuItem href={RoutePath.DiscoverComics} icon={<DiscoverIcon />} isActive={isDiscover} title='Discover' />
          <MenuItem href={RoutePath.Library} isActive={isLibrary} icon={<LibraryIcon />} title='Library' />
          <MenuItem href={RoutePath.Profile} isActive={isProfile} icon={<ProfileIcon />} title='Profile' />
        </div>
        <Button className='min-h-12'>Hop in</Button>
        {isMint ? <BaseWalletMultiButtonDynamic style={{ fontSize: '17px' }} labels={WALLET_LABELS} /> : null}
      </div>
    </div>
  )
}

type MenuItemProps = { href: string; icon: React.ReactNode; isActive: boolean; title: string }

const MenuItem: React.FC<MenuItemProps> = ({ href, icon, isActive, title }) => (
  <Link className={clsx('flex gap-2 items-center', isActive && 'text-yellow-500')} href={href}>
    {icon}
    <span className='text-xl font-medium'>{title}</span>
  </Link>
)
