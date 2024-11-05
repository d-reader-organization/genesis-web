'use client'

import { BaseLayout } from '@/components/layout/BaseLayout'
import { PROJECTS } from '@/constants/projects'
import { cn } from '@/lib/utils'
import { Project } from '@/models/project'
import Link from 'next/link'
import Image from 'next/image'
import { Button, Text } from '@/components/ui'
import { SearchInput } from '@/components/shared/SearchInput'
import React from 'react'
import { ProfileSheet } from '@/components/shared/sheets/profile/ProfileSheet'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'

type FilterBarProps = {
  slug?: string
}

export const FilterBar: React.FC<FilterBarProps> = ({ slug }) => {
  const [isFilterSheetOpen, setFilterSheetOpen] = React.useState<boolean>(false)
  console.log('filterbar')
  return (
    <div className='flex'>
      <div
        className={cn(
          'max-md:hidden max-h-20 bg-grey-600 bg-opacity-85 backdrop-blur-[25px] w-full flex justify-center',
          'fixed top-0 z-50',
          isFilterSheetOpen ? 'z-10' : ''
        )}
      >
        <FilterSheet isOpen={isFilterSheetOpen} triggerOpenChange={(open: boolean) => setFilterSheetOpen(open)} />
      </div>
      <Button
        className='max-h-[42px] p-4 flex justify-center items-center'
        onClick={() => setFilterSheetOpen(!isFilterSheetOpen)}
      >
        Filter
      </Button>
      <Button className='bg-grey-500 text-gray-100'>Clear all</Button>
      <SearchInput />
    </div>
  )
}

type ProfileSheetProps = {
  isOpen: boolean
  triggerOpenChange: (open: boolean) => void
}

const FilterSheet: React.FC<ProfileSheetProps> = ({ isOpen, triggerOpenChange }) => (
  <div className='max-md:hidden'>
    <Sheet open={isOpen} onOpenChange={triggerOpenChange}>
      <SheetTitle className='sr-only'>Open menu</SheetTitle>
      <SheetContent
        aria-describedby={undefined}
        side='left'
        showCloseIcon
        className='p-6 flex flex-col h-full w-full bg-grey-600 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)] max-w-[420px]'
        onInteractOutside={() => {
          triggerOpenChange(false)
        }}
      >
        FilterContent
      </SheetContent>
    </Sheet>
    <div
      className={cn(
        'fixed inset-0 bg-transparent  backdrop-blur-[25px] z-40 transition-all duration-300',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      aria-hidden='true'
    />
  </div>
)
