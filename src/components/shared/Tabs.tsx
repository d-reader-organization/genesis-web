'use client'

import { Tab } from '@/constants/tabs'
import Link from 'next/link'
import { Text } from '../ui'
import React from 'react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { SoonTag } from './Tags'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  tabs: Tab[]
}

export const Tabs: React.FC<Props> = ({ tabs, className }) => {
  const selectedTab = usePathname()

  return (
    <div className='flex flex-col gap-2'>
      <div className={cn('flex justify-start gap-6', className)}>
        {tabs.map((tab: Tab) => (
          <div
            key={tab.url}
            className={cn(
              'flex flex-row items-center bg-transparent rounded-none pb-2',
              selectedTab === tab.url && !tab.disabled && 'border-b-[2px] z-10'
            )}
          >
            {tab.disabled ? (
              <>
                <Text
                  as='h4'
                  styleVariant='secondary-heading'
                  fontWeight='bold'
                  className={cn('max-sm:text-base', 'text-grey-200')}
                >
                  {tab.name}
                </Text>
                <SoonTag className='sm:-mt-1' />
              </>
            ) : (
              <Link href={tab.url} className='flex items-center'>
                <Text
                  as='h4'
                  styleVariant='secondary-heading'
                  fontWeight='bold'
                  className={cn('max-sm:text-base', selectedTab === tab.url ? 'text-white' : 'text-grey-200')}
                >
                  {tab.name}
                </Text>
              </Link>
            )}
          </div>
        ))}
      </div>
      <div className='w-full h-[2px] bg-grey-300 -mt-[10px]' />
    </div>
  )
}
