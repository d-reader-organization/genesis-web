'use client'

import { Section } from '@/components/discover/filters'
import Link from 'next/link'
import { Text } from '../ui'
import React from 'react'
import { cn } from '@/lib/utils'
import { useDiscoverFilterStore } from '@/providers/DiscoverFilterStoreProvider'

type Props = {
  sections: Section[]
}

export const Sections: React.FC<Props> = ({ sections }) => {
  const selectedSection = useDiscoverFilterStore((state) => state.selectedSection)

  return (
    <div className='flex flex-col w-full'>
      <div className='flex gap-4 relative'>
        {sections.map((section) => (
          <Link
            href={section.url}
            key={section.id}
            className={cn(
              'bg-transparent rounded-none px-1',
              selectedSection?.id === section.id && 'border-b-[2px] z-10'
            )}
          >
            <Text
              as='h4'
              styleVariant='secondary-heading'
              className={cn(
                selectedSection?.id === section.id ? 'text-white cursor-pointer' : 'text-grey-200 cursor-pointer'
              )}
            >
              {section.name}
            </Text>
          </Link>
        ))}
      </div>
      <div className='w-full h-[2px] bg-grey-300 rounded-md -mt-[2px]' />
    </div>
  )
}
