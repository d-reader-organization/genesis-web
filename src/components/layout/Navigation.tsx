import React from 'react'
import { RoutePath } from '@/enums/routePath'
import { usePathname } from 'next/navigation'
import { useIsMobile } from '@/hooks/useBreakpoints'
import { BottomNavigation } from './BottomNavigation'
import FullLogo from 'public/assets/vector-icons/full-logo.svg'
import SearchIcon from 'public/assets/vector-icons/search-icon.svg'
import DiscoverIcon from 'public/assets/vector-icons/discover-icon.svg'
import LibraryIcon from 'public/assets/vector-icons/library-icon.svg'
import ProfileIcon from 'public/assets/vector-icons/profile.svg'
import { Button, Input } from '../ui'
import Link from 'next/link'
import clsx from 'clsx'

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
    <BottomNavigation />
  ) : (
    <div
      className={clsx(
        'w-full px-8 pt-8 pb-4 max-w-[1536px] gap-4 flex justify-between items-center my-0 mx-auto',
        (isHome || isDiscover) && 'fixed  left-0 right-0'
      )}
    >
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
