'use client'

import { Tab } from '@/constants/tabs'
import Link from 'next/link'
import { Text } from '../ui'
import React from 'react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

type Props = {
  label: string
  tabs: Tab[]
}

export const Tabs: React.FC<Props> = ({ label, tabs }) => {
  const selectedTab = usePathname()

  return (
    <div className='flex flex-col w-full relative '>
      <Text
        as='h1'
        styleVariant='primary-heading'
        className='absolute -top-6 left-2 text-grey-100 text-transparent uppercase bg-gradient-to-b from-grey-400 via-grey-600 via-60% to-transparent bg-clip-text'
      >
        {label}
      </Text>
      <div className='flex justify-around gap-6 relative md:justify-start mt-2'>
        {tabs.map((tab: Tab) => (
          <Link
            key={tab.url}
            href={tab.url}
            className={cn('bg-transparent rounded-none px-1 pb-1', selectedTab === tab.url && 'border-b-[2px] z-10')}
          >
            <Text
              as='h4'
              styleVariant='secondary-heading'
              className={cn('cursor-pointer', selectedTab === tab.url ? 'text-white' : 'text-grey-200')}
            >
              {tab.name}
            </Text>
          </Link>
        ))}
      </div>
      <div className='w-full h-[2px] bg-grey-300 rounded-md -mt-[2px]' />
    </div>
  )
}
