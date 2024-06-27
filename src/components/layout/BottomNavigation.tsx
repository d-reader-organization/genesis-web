import React from 'react'
import HomeIcon from 'public/assets/vector-icons/home-icon.svg'
import DiscoverIcon from 'public/assets/vector-icons/discover-icon.svg'
import ProfileIcon from 'public/assets/vector-icons/profile.svg'
import { RoutePath } from '@/enums/routePath'
import Link from 'next/link'
import clsx from 'clsx'

type Props = {
  initialNavItem?: BottomNavItem
}

export enum BottomNavItem {
  home = 'home',
  discover = 'discover',
  profile = 'profile',
}

type BottomNavItemProps = {
  href: string
  icon: React.ReactNode
  isSelected: boolean
  title: string
}

export const BottomNavigation: React.FC<Props> = ({ initialNavItem }) => {
  return (
    <div className='fixed bottom-0 backdrop-blur-[10px] left-0 z-50 w-full h-16 bg-grey-500'>
      <div className='grid h-full max-w-lg grid-cols-3 mx-auto'>
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
          href={RoutePath.Profile}
          icon={<ProfileIcon />}
          isSelected={initialNavItem === BottomNavItem.profile}
          title='Profile'
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
    <span className='text-sm font-normal'>{title}</span>
  </Link>
)
