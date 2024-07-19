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
import MarketplaceIcon from 'public/assets/vector-icons/marketplace.svg'
import { Input } from '../ui'
import Link from 'next/link'
import clsx from 'clsx'
import { WALLET_LABELS } from '@/constants/wallets'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'

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
      <div className='flex gap-4 justify-between items-center my-0 mx-auto max-w-[1536px] px-8 py-4 w-full'>
        <Link href={RoutePath.Home}>
          <FullLogo className='h-8 min-w-fit' />
        </Link>
        {!isMint && (
          <Input
            className='w-full max-w-sm lg:max-w-md xl:max-w-lg lg:justify-self-center'
            placeholder='Search comics, episodes, genres, and creators'
            prefixIcon={<SearchIcon />}
          />
        )}
        <div className='flex gap-4 md:gap-6'>
          <MenuItem href={RoutePath.DiscoverComics} icon={<DiscoverIcon />} isActive={isDiscover} title='Discover' />
          <MenuItem comingSoon href='' isActive={false} icon={<MarketplaceIcon />} title='Marketplace' />
          <MenuItem href={RoutePath.Library} isActive={isLibrary} icon={<LibraryIcon />} title='Library' />
          <BaseWalletMultiButtonDynamic style={{ fontSize: '17px' }} labels={WALLET_LABELS} />
        </div>
      </div>
    </div>
  )
}

type MenuItemProps = {
  comingSoon?: boolean
  href: string
  icon: React.ReactNode
  isActive: boolean
  title: string
}

const MenuItem: React.FC<MenuItemProps> = ({ comingSoon, href, icon, isActive, title }) => (
  <Link
    className={clsx('flex gap-2 items-center', comingSoon && 'cursor-default', isActive && 'text-yellow-500')}
    href={href}
  >
    {icon}
    <span className={cn('text-lg font-medium', comingSoon && 'text-grey-200')}>{title}</span>
    {comingSoon && (
      <div className='bg-grey-200 rounded-xl p-1.5 flex justify-center items-center text-text-black text-[10px] font-bold'>
        SOON
      </div>
    )}
  </Link>
)
