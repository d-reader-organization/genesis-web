import React from 'react'
import HomeIcon from 'public/assets/vector-icons/home-icon.svg'
import DiscoverIcon from 'public/assets/vector-icons/discover-icon.svg'
import ProfileIcon from 'public/assets/vector-icons/profile.svg'
import { useSessionStorage } from '@/hooks/useSessionStorage'
import { RoutePath } from '@/enums/routePath'
import Link from 'next/link'

type Props = {
  initialNavItem?: BottomNavItem
}

enum BottomNavItem {
  home = 'home',
  discover = 'discover',
  profile = 'profile',
}

type BottomNavItemProps = {
  href: string
  icon: React.ReactNode
  isSelected: boolean
  onClick: () => void
  title: string
}

export const BottomNavigation: React.FC<Props> = ({ initialNavItem }) => {
  const bottomNavItemKey = 'bottom_nav_item'
  const [navItemValue, setNavItemValue] = useSessionStorage(bottomNavItemKey, initialNavItem)
  const selectedColor = '#fceb54'

  const updateSelectedItem = (item: BottomNavItem) => () => setNavItemValue(item)

  return (
    <div className='fixed bottom-0 backdrop-blur-[10px] left-0 z-50 w-full h-16 bg-grey-500'>
      <div className='grid h-full max-w-lg grid-cols-3 mx-auto'>
        <BottomNavigationItem
          href={RoutePath.Home}
          icon={<HomeIcon color={navItemValue === BottomNavItem.home ? selectedColor : undefined} />}
          isSelected={navItemValue === BottomNavItem.home}
          onClick={updateSelectedItem(BottomNavItem.home)}
          title='Home'
        />
        <BottomNavigationItem
          href={RoutePath.DiscoverComics}
          icon={<DiscoverIcon color={navItemValue === BottomNavItem.discover ? selectedColor : undefined} />}
          isSelected={navItemValue === BottomNavItem.discover}
          onClick={updateSelectedItem(BottomNavItem.discover)}
          title='Discover'
        />
        <BottomNavigationItem
          href={RoutePath.Profile}
          icon={<ProfileIcon color={navItemValue === BottomNavItem.profile ? selectedColor : undefined} />}
          isSelected={navItemValue === BottomNavItem.profile}
          onClick={updateSelectedItem(BottomNavItem.profile)}
          title='Profile'
        />
      </div>
    </div>
  )
}

const BottomNavigationItem: React.FC<BottomNavItemProps> = ({ href, icon, isSelected, onClick, title }) => (
  <Link
    className='inline-flex flex-col items-center justify-center font-medium px-5 group'
    href={href}
    onClick={onClick}
  >
    {icon}
    <span
      className={`text-sm font-normal ${isSelected ? 'text-yellow-500' : 'text-white'} group-hover:text-yellow-500`}
    >
      {title}
    </span>
  </Link>
)
