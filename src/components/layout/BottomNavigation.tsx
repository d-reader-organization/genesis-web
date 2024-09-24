import React from 'react'
import HomeIcon from 'public/assets/vector-icons/home-icon.svg'
import DiscoverIcon from 'public/assets/vector-icons/discover-icon.svg'
import InvestIcon from 'public/assets/vector-icons/invest-icon-fill.svg'
import BookmarkIcon from 'public/assets/vector-icons/bookmark-icon.svg'
import { RoutePath } from '@/enums/routePath'
import Link from 'next/link'
import clsx from 'clsx'

type Props = {
  initialNavItem?: BottomNavItem
}

export enum BottomNavItem {
  home = 'home',
  discover = 'discover',
  invest = 'invest',
  library = 'library',
}

type BottomNavItemProps = {
  href: string
  icon: React.ReactNode
  isSelected: boolean
  title: string
}

export const BottomNavigation: React.FC<Props> = ({ initialNavItem }) => {
  return (
    <div className='fixed bottom-0 backdrop-blur-[10px] left-0 z-50 w-full p-4 h-14 bg-grey-500 bg-opacity-70'>
      <div className='grid h-full max-w-lg grid-cols-4 gap-4'>
        <BottomNavigationItem
          href={RoutePath.Home}
          icon={<HomeIcon />}
          isSelected={initialNavItem === BottomNavItem.home}
          title='Home'
        />
        <BottomNavigationItem
          href={RoutePath.DiscoverComics}
          icon={<DiscoverIcon />}
          isSelected={initialNavItem === BottomNavItem.discover}
          title='Discover'
        />
        <BottomNavigationItem
          href={RoutePath.Invest}
          icon={<InvestIcon />}
          isSelected={initialNavItem === BottomNavItem.invest}
          title='Invest'
        />
        <BottomNavigationItem
          href={RoutePath.Library}
          icon={<BookmarkIcon />}
          isSelected={initialNavItem === BottomNavItem.library}
          title='Library'
        />
      </div>
    </div>
  )
}

const BottomNavigationItem: React.FC<BottomNavItemProps> = ({ href, icon, isSelected, title }) => (
  <Link
    className={clsx(
      'inline-flex flex-col items-center justify-center font-medium px-5 group',
      isSelected && 'text-yellow-500'
    )}
    href={href}
  >
    {icon}
    {/* <span className='text-sm font-normal'>{title}</span> */}
  </Link>
)
