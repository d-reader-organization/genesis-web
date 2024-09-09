'use client'

import React from 'react'
import { RoutePath } from '@/enums/routePath'
import { usePathname } from 'next/navigation'
import { useIsMobile } from '@/hooks/useBreakpoints'
import { BottomNavItem, BottomNavigation } from './BottomNavigation'
import Logo from 'public/assets/vector-icons/logo.svg'
import SearchIcon from 'public/assets/vector-icons/search-icon.svg'
import DiscoverIcon from 'public/assets/vector-icons/discover-icon.svg'
import LibraryIcon from 'public/assets/vector-icons/library-icon.svg'
import MarketplaceIcon from 'public/assets/vector-icons/marketplace.svg'
import InvestIcon from 'public/assets/vector-icons/invest-icon.svg'
import SparklesIcon from 'public/assets/vector-icons/sparkles-icon.svg'
import { Button, Input } from '../ui'
import Link from 'next/link'
import clsx from 'clsx'
import { cn } from '@/lib/utils'

type Props = {
  paramId?: string | number
}

export const Navigation: React.FC<Props> = ({ paramId }) => {
  const pathname = usePathname()

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
      className={clsx('mx-4 mt-4 max-h-20  flex items-center justify-between p-4 bg-grey-400 rounded-2xl shadow-')}
      style={{ boxShadow: '4px 4px 0px 0px #00' }}
    >
      <div className='flex gap-8 xl:gap-12'>
        <Link href={RoutePath.Home}>
          <Logo className='h-8 min-w-fit fill-white ml-4' />
        </Link>
        <MenuItem href={RoutePath.DiscoverComics} icon={<DiscoverIcon />} isActive={isDiscover} title='Discover' />
        <MenuItem comingSoon href='' isActive={false} icon={<MarketplaceIcon />} title='Marketplace' />
        <MenuItem comingSoon href='' isActive={false} icon={<InvestIcon />} title='Invest' />
      </div>
      {!isMint && (
        <Input
          className='inline-flex justify-center items-center max-w-64 lg:max-w-80 w-full'
          placeholder='Search comics, episodes, genres, and creators'
          prefixIcon={<SearchIcon />}
        />
      )}
      <div className='flex gap-8 xl:gap-12'>
        <MenuItem href={RoutePath.Library} isActive={isLibrary} icon={<LibraryIcon />} title='Library' />
        <div className='flex gap-4'>
          <div
            className='flex py-4 px-2 size-12 items-center justify-center rounded-xl border border-white bg-yellow-50 cursor-pointer'
            style={{
              boxShadow: '2px 2px 0px 0px #000',
            }}
          >
            <SparklesIcon />
          </div>
          <Button className='rounded-xl min-w-28'>Hop in</Button>
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
    className={clsx(
      'flex gap-2 items-center',
      comingSoon && 'cursor-default text-grey-200',
      isActive && 'text-yellow-500'
    )}
    href={href}
  >
    {icon}
    <span className={cn('text-lg font-medium', comingSoon && 'text-grey-200')}>{title}</span>
    {/* {comingSoon && (
      <div className='bg-grey-200 rounded-xl p-1.5 flex justify-center items-center text-text-black text-[10px] font-bold'>
        SOON
      </div>
    )} */}
  </Link>
)
