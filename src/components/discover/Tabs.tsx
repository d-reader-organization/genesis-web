'use client'

import { Section } from '@/constants/filters'
import Link from 'next/link'
import { Text } from '../ui'
import React from 'react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

type Props = {
  sections: Section[]
}

export const Tabs: React.FC<Props> = ({ sections }) => {
  const selectedSection = usePathname()

  return (
    <div className='flex flex-col w-full'>
      <div className='flex gap-6 relative'>
        {sections.map((section) => (
          <Link
            href={section.url}
            key={section.url}
            className={cn(
              'bg-transparent rounded-none px-1 pb-1',
              selectedSection === section.url && 'border-b-[2px] z-10'
            )}
          >
            <Text
              as='h4'
              styleVariant='secondary-heading'
              className={cn(
                'cursor-pointer',
                selectedSection === section.url ? 'text-white' : 'text-grey-200 cursor-pointer'
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
