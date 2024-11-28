'use client'

import React from 'react'
import { RoutePath } from '@/enums/routePath'
import GenesisLogo from 'public/assets/vector-icons/genesis-logo.svg'
import DReaderLogo from 'public/assets/vector-icons/full-logo.svg'
import ArrowDownIcon from 'public/assets/vector-icons/arrow-down-2.svg'
import { Button } from '../ui'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { MobileNav } from './MobileNavigation'
import { ProfileSheet } from '../shared/sheets/profile/ProfileSheet'
import { User } from '@/models/user'
import { MoveLeft } from 'lucide-react'
import { usePathname } from 'next/navigation'

type Props = {
  me: User | null
}

export const GenesisNavigation: React.FC<Props> = ({ me }) => {
  const [isProfileSheetOpen, setOpenProfileSheet] = React.useState<boolean>(false)
  const pathname = usePathname()
  const isInvest = pathname.endsWith(RoutePath.Invest)

  return (
    <>
      <MobileNav user={me} />
      <div
        className={cn(
          'max-md:hidden max-h-20 bg-opacity-85 backdrop-blur-[25px] w-full flex justify-center',
          'fixed top-0 z-50',
          isInvest ? 'bg-green-genesis' : 'bg-grey-600',
          isProfileSheetOpen && 'z-10'
        )}
      >
        <div className='flex items-center justify-between p-4 max-w-screen-xl w-full'>
          <Link href={RoutePath.Invest}>
            <GenesisLogo className='h-8 min-w-fit fill-white ml-4' />
          </Link>
          <div className='flex items-center gap-2'>
            <div className='flex items-center border border-white rounded-xl p-2'>
              <MoveLeft size={16} />
              <Link href={RoutePath.Home}>
                <DReaderLogo className='h-6 min-w-fit fill-white ml-4' />
              </Link>
            </div>
            {me ? (
              <button
                className='flex items-center cursor-pointer'
                onClick={() => setOpenProfileSheet(!isProfileSheetOpen)}
              >
                <div className='bg-white rounded-xl flex items-center justify-center gap-1.5 px-2 h-10'>
                  <Image
                    alt='avatar'
                    src={me.avatar || 'https://d323dls9ny69nf.cloudfront.net/users/5256/avatar-1713526462785.png'}
                    width={28}
                    height={28}
                    className='size-7 object-cover rounded-full border border-black'
                  />
                  <ArrowDownIcon className='flex justify-center items-center fill-grey-500' />
                </div>
              </button>
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
      </div>
      <ProfileSheet
        isOpen={isProfileSheetOpen}
        user={me}
        triggerOpenChange={(open: boolean) => setOpenProfileSheet(open)}
      />
    </>
  )
}
