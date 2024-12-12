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
          <Link
            key={tab.url}
            href={tab.url}
            className={cn(
              'flex items-center bg-transparent rounded-none pb-2',
              tab.disabled && 'pointer-events-none',
              selectedTab === tab.url && 'border-b-[2px] z-10'
            )}
          >
            <Text
              as='h4'
              styleVariant='secondary-heading'
              fontWeight='bold'
              className={cn('max-sm:text-base', selectedTab === tab.url ? 'text-white' : 'text-grey-200')}
            >
              {tab.name}
            </Text>
            {tab.disabled && <SoonTag />}
          </Link>
        ))}
      </div>
      <div className='w-full h-[2px] bg-grey-300 -mt-[10px]' />
    </div>
  )
}
