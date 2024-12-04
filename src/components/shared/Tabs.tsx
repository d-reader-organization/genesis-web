'use client'

import { Tab } from '@/constants/tabs'
import Link from 'next/link'
import { Text } from '../ui'
import React from 'react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  tabs: Tab[]
}

export const Tabs: React.FC<Props> = ({ tabs, className }) => {
  const selectedTab = usePathname()

  return (
    <>
      <div className={cn('flex justify-start gap-6', className)}>
        {tabs.map((tab: Tab) => (
          <Link
            key={tab.url}
            href={tab.url}
            className={cn('bg-transparent rounded-none pb-1 cursor-pointer', selectedTab === tab.url && 'border-b-[2px] z-10')}
          >
            <Text
              as='h4'
              styleVariant='secondary-heading'
              className={cn(selectedTab === tab.url ? 'text-white' : 'text-grey-200')}
            >
              {tab.name}
            </Text>
          </Link>
        ))}
      </div>
      <div className='w-full h-[2px] bg-grey-300 -mt-[14px]' />
    </>
  )
}
