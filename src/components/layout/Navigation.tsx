'use client'

import React from 'react'
import { RoutePath } from '@/utils/enums'
import { usePathname } from 'next/navigation'
import DReaderLogo from 'public/assets/vector-icons/full-logo.svg'
import GenesisLogo from 'public/assets/vector-icons/genesis-logo.svg'
import ArrowDownIcon from 'public/assets/vector-icons/arrow-down-2.svg'
import { Button } from '../ui'
import Link from 'next/link'
import { cn } from '@/utils/general'
import Image from 'next/image'
import { MobileNav } from './MobileNavigation'
import { ProfileSheet } from '../shared/sheets/profile/ProfileSheet'
import { SearchInput } from '../shared/SearchInput'
import { User } from '@/models/user'

type Props = {
  me: User | null
}

export const Navigation: React.FC<Props> = ({ me }) => {
  const [isProfileSheetOpen, setOpenProfileSheet] = React.useState<boolean>(false)
  const pathname = usePathname()
  const isInvest = pathname.startsWith(RoutePath.Invest)
  const isLibrary = pathname.startsWith(RoutePath.Library)

  return (
    <>
      <MobileNav user={me} />
      <div
        className={cn(
          'max-md:hidden max-h-20 bg-grey-600 bg-opacity-85 backdrop-blur-[25px] w-full flex justify-center',
          'fixed top-0 z-50',
          isProfileSheetOpen ? 'z-10' : ''
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
            <SearchInput />
            <div className='flex items-center gap-10'>
              <MenuItem href={RoutePath.Invest} isActive={isInvest} isComingSoon title='Invest' />
            </div>
          </div>
          {me ? (
            <div className='flex items-center gap-8'>
              <MenuItem href={RoutePath.Library} isActive={isLibrary} title='My Library' />
              <button
                className='flex items-center cursor-pointer'
                onClick={() => setOpenProfileSheet(!isProfileSheetOpen)}
              >
                <div className='bg-white bg-opacity-15 rounded-xl flex items-center justify-center gap-1.5 px-2 h-10'>
                  <Image
                    alt='avatar'
                    src={me.avatar || 'https://d323dls9ny69nf.cloudfront.net/users/5256/avatar-1713526462785.png'}
                    width={28}
                    height={28}
                    className='size-7 object-cover rounded-full border border-black'
                  />
                  <ArrowDownIcon className='flex justify-center items-center' />
                </div>
              </button>
            </div>
          ) : (
            <Button
              className='max-h-10 p-4 flex justify-center items-center text-sm font-bold leading-[19.6px] text-black rounded-xl bg-white w-fit'
              variant='ghost'
              onClick={() => setOpenProfileSheet(!isProfileSheetOpen)}
            >
              Connect
            </Button>
          )}
        </div>
      </div>
      <ProfileSheet
        isOpen={isProfileSheetOpen}
        user={me}
        triggerOpenChange={(open: boolean) => setOpenProfileSheet(open)}
      />
    </>
  )
}

type MenuItemProps = {
  href: string
  isActive: boolean
  isComingSoon?: boolean
  title: string
}

const MenuItem: React.FC<MenuItemProps> = ({ href, isActive, isComingSoon = false, title }) => (
  <div className='flex items-center gap-1 text-base font-bold leading-[22.4px]'>
    {isComingSoon ? (
      <>
        <span className='text-grey-300'>{title}</span>
        <div className='flex items-center justify-center px-1.5 py-1 bg-grey-300 rounded-lg min-w-[42px] max-h-5'>
          <span className='text-[10px] font-bold leading-normal text-grey-600'>SOON</span>
        </div>
      </>
    ) : (
      <Link className={cn('text-grey-100', isActive && 'text-yellow-500')} href={href}>
        {title}
      </Link>
    )}
  </div>
)
