'use client'

import React from 'react'
import { RoutePath } from '@/enums/routePath'
import { usePathname } from 'next/navigation'
import { useIsMobile } from '@/hooks/useBreakpoints'
import { BottomNavItem } from './BottomNavigation'
import DReaderLogo from 'public/assets/vector-icons/full-logo.svg'
import GenesisLogo from 'public/assets/vector-icons/genesis-logo.svg'
import SearchIcon from 'public/assets/vector-icons/search-icon.svg'
import DiscoverIcon from 'public/assets/vector-icons/discover-icon.svg'
import MarketplaceIcon from 'public/assets/vector-icons/marketplace.svg'
import InvestIcon from 'public/assets/vector-icons/invest-icon.svg'
import InvestIconFill from 'public/assets/vector-icons/invest-icon-fill.svg'
import SparklesIcon from 'public/assets/vector-icons/sparkles-icon.svg'
import { Button, Input } from '../ui'
import Link from 'next/link'
import clsx from 'clsx'

type Props = {
  paramId?: string | number
}

const initialMobileNavItem = (pathname: string) => {
  if (pathname.startsWith(RoutePath.Discover)) {
    return BottomNavItem.discover
  } else if (pathname.startsWith(RoutePath.Library)) {
    return BottomNavItem.library
  } else if (pathname.startsWith(RoutePath.Invest)) {
    return BottomNavItem.invest
  }
  return BottomNavItem.home
}

export const Navigation: React.FC<Props> = ({ paramId }) => {
  const pathname = usePathname()
  const isMobile = useIsMobile()

  const isDiscover = pathname.startsWith(RoutePath.Discover)
  const isInvest = pathname.startsWith(RoutePath.Invest)
  const isMint = paramId ? pathname === RoutePath.Mint(paramId) || RoutePath.ComicIssue(paramId) : false

  return isMobile ? (
    // TODO new nav
    <></>
  ) : (
    // <BottomNavigation initialNavItem={initialMobileNavItem(pathname)} />
    <>
      <div
        className={clsx(
          'max-h-20 bg-grey-600 bg-opacity-80 backdrop-blur-[25px] w-full flex justify-center',
          'fixed top-0 z-10'
        )}
      >
        <div className='flex items-center justify-between p-4 max-w-screen-xl w-full'>
          <div className='flex items-center gap-8'>
            <Link href={RoutePath.Home}>
              {isInvest ? (
                <GenesisLogo className='h-8 min-w-fit fill-white ml-4' />
              ) : (
                <DReaderLogo className='h-8 min-w-fit fill-white ml-4' />
              )}
            </Link>
            {!isMint && (
              <Input
                className='inline-flex justify-center items-center max-w-64 lg:max-w-80 w-full'
                placeholder='Search comics or creators'
                prefixIcon={<SearchIcon />}
              />
            )}
            <MenuItem href={RoutePath.DiscoverComics} icon={<DiscoverIcon />} isActive={isDiscover} title='Discover' />
            <MenuItem comingSoon href='' isActive={false} icon={<MarketplaceIcon />} title='Marketplace' />
            <MenuItem
              href={RoutePath.Invest}
              isActive={isInvest}
              icon={isInvest ? <InvestIconFill /> : <InvestIcon />}
              title='Invest'
            />
          </div>

          <div className='flex gap-4 items-center max-h-14'>
            <div className='flex py-4 px-2 size-10 items-center justify-center rounded-xl bg-yellow-500 cursor-pointer'>
              <SparklesIcon />
            </div>
            {isInvest ? (
              <Button className='rounded-xl min-w-[88px] size-10 p-4 bg-white'>Connect</Button>
            ) : (
              <Button className='rounded-xl min-w-28'>Hop in</Button>
            )}
          </div>
        </div>
      </div>
    </>
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
      'flex gap-2 items-center text-grey-100',
      comingSoon && 'cursor-default',
      isActive && 'text-yellow-500'
    )}
    href={href}
  >
    {icon}
    <span className='text-sm font-bold max-lg:hidden'>{title}</span>
    {/* {comingSoon && (
      <div className='bg-grey-200 rounded-xl p-1.5 flex justify-center items-center text-text-black text-[10px] font-bold'>
        SOON
      </div>
    )} */}
  </Link>
)
